package com.ssafy.cadang.service;

import com.ssafy.cadang.domain.Drink;
import com.ssafy.cadang.domain.Order;
import com.ssafy.cadang.domain.OrderStatus;
import com.ssafy.cadang.domain.User;
import com.ssafy.cadang.dto.record.*;
import com.ssafy.cadang.error.CustomException;
import com.ssafy.cadang.error.ExceptionEnum;
import com.ssafy.cadang.repository.DrinkRepository;
import com.ssafy.cadang.repository.RecordReposiotry;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecordService {
    private final RecordReposiotry recordReposiotry;
    private final UserRepository userRepository;
    private final DrinkRepository drinkRepository;
    private static OrderStatus[] recordStatus = {OrderStatus.RECORD, OrderStatus.PICKUP};
    private final DataService dataService;
    @Value("${EC2_FILE_PATH}")
    private String RecordUploadPath;

    @Transactional
    public Long saveRecordDirectly(RecordSaveRequestDto recordDto) throws IOException {
        User user = userRepository.findById(recordDto.getUserId())
                .orElseThrow(() -> new CustomException(ExceptionEnum.USER_NOT_FOUND));
        Drink drink = drinkRepository.findById(recordDto.getDrinkId())
                .orElseThrow(() -> new CustomException(ExceptionEnum.DRINK_NOT_FOUND));
        LocalDateTime regDate = LocalDateTime.now();
        if (recordDto.getRegDate() != null) {
            regDate = LocalDate.parse(recordDto.getRegDate()).atStartOfDay();
        }

        Order record = Order.builder()
                .user(user)
                .drink(drink)
                .regDate(regDate)
                .caffeine(recordDto.getCaffeine())
                .sugar(recordDto.getSugar())
                .cal(recordDto.getCal())
                .price(recordDto.getPrice())
                .shot(recordDto.getShot())
                .whip(recordDto.getWhip())
                .sugarContent(recordDto.getSugarContent())
                .syrup(recordDto.getSyrup())
                .vanilla(recordDto.getVanilla())
                .hazelnut(recordDto.getHazelnut())
                .caramel(recordDto.getCaramel())
                .photo(drink.getImage())
                .storeName(recordDto.getStoreName())
                .orderStatus(OrderStatus.RECORD)
                .build();
        dataService.updateData(record);
        Order saveRecord = recordReposiotry.save(record);
        return saveRecord.getId();
    }


    public RecordDetailDto getOrderByRecordId(Long userId, Long recordId) {
        Order order = recordReposiotry.findById(recordId)
                .orElseThrow(() -> new CustomException(ExceptionEnum.RECORD_NOT_FOUND));
        if (!Objects.equals(order.getUser().getId(), userId)) {
            throw new CustomException(ExceptionEnum.USER_NOT_SAME);
        }
        String image = order.getDrink().getImage();

        return toRecordDetailDto(order, image);


    }

    @Transactional
    public Long deleteOrderById(Long userId, Long recordId) {
        Order findRecord = recordReposiotry.findById(recordId)
                .orElseThrow(() -> new CustomException(ExceptionEnum.RECORD_NOT_FOUND));
        if (!Objects.equals(findRecord.getUser().getId(), userId)) {
            throw new CustomException(ExceptionEnum.USER_NOT_SAME);
        }

        dataService.updateDataByDelete(findRecord);
        recordReposiotry.delete(findRecord);


        return recordId;

    }

    public MyPageRecordListDto searchByKeyword(Long userId, String keyword, int page, int size) {
        // pagination
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Order> orders;
        if (keyword == null) // keyword가 null면 전체 조회
            orders = recordReposiotry.findAllByPage(userId, recordStatus, pageRequest);
        else {
            // 키워드 검색
            keyword = "%" + keyword + "%";
            orders = recordReposiotry.findBySearchKeyword(userId, keyword, recordStatus, pageRequest);
        }
        //

        List<MyPageRecordDto> recordDtos = toMyPageRecordDtos(orders);
        return MyPageRecordListDto.builder()
                .recordList(recordDtos)
                .hasPrevious(orders.hasPrevious())
                .hasNext(orders.hasNext())
                .totalPage(orders.getTotalPages())
                .build();

    }

    @Transactional
    public Long updateRecord(Long userId, RecordUpdateDto updateDto) throws IOException {
        Order findRecord = recordReposiotry.findById(updateDto.getId())
                .orElseThrow(() -> new CustomException(ExceptionEnum.RECORD_NOT_FOUND));
        if (!Objects.equals(findRecord.getUser().getId(), userId)) {
            throw new CustomException(ExceptionEnum.USER_NOT_SAME);
        }
        if (findRecord.getOrderStatus() == OrderStatus.PICKUP && updateDto.getRegDate() != null) {
            throw new CustomException(ExceptionEnum.RECORD_NOT_ALLOWED_MODIFY);
        }
        // 파일 업로드
        // TODO 날짜 형식 프론트와 통일하기
        LocalDateTime localDateTime = LocalDate.parse(updateDto.getRegDate()).atStartOfDay();
        findRecord.setRegDate(localDateTime);
        findRecord.setMemo(updateDto.getMemo());
        findRecord.setPublic(updateDto.getIsPublic());
        if (updateDto.getIsModified() == 1) { 
            // 수정
            String imgUrl = uploadImage(updateDto.getImage(), updateDto.getRegDate());
            findRecord.setPhoto(imgUrl);
        } else if (updateDto.getIsModified() == 2) {
            // 기본 이미지로
            String imgUrl = findRecord.getDrink().getImage();
            findRecord.setPhoto(imgUrl);
        }
        return findRecord.getId();

    }


    public int getSum(Long userId, int month, int year) {
        return recordReposiotry.findSumByUserAndMonth(userId, month, year, recordStatus);
    }

    private List<MyPageRecordDto> toMyPageRecordDtos(Slice<Order> orders) {
        return orders.getContent()
                .stream()
                .map(o -> MyPageRecordDto.builder()
                        .id(o.getId())
                        .storeName(o.getStoreName())
                        .drinkName(o.getDrink().getDrinkName())
                        .regDate(o.getRegDate())
                        .caffeine(o.getCaffeine())
                        .sugar(o.getSugar())
                        .cal(o.getCal())
                        .price(o.getPrice())
                        .isPublic(o.isPublic())
                        .memo(o.getMemo())
                        .photo(o.getPhoto())
                        .build())
                .sorted(Comparator.comparing(MyPageRecordDto::getRegDate).reversed())
                .collect(Collectors.toList());
    }

    private RecordDetailDto toRecordDetailDto(Order order, String defaultUrl) {
        return RecordDetailDto.builder()
                .id(order.getId())
                .photo(order.getPhoto())
                .drinkName(order.getDrink().getDrinkName())
                .caffeine(order.getCaffeine())
                .sugar(order.getSugar())
                .price(order.getPrice())
                .cal(order.getCal())
                .regDate(order.getRegDate())
                .memo(order.getMemo())
                .size(order.getDrink().getSize())
                .shot(order.getShot())
                .whip(order.getWhip())
                .sugarContent(order.getSugarContent())
                .syrup(order.getSyrup())
                .vanilla(order.getVanilla())
                .caramel(order.getCaramel())
                .hazelnut(order.getHazelnut())
                .orderStatus(order.getOrderStatus())
                .defaultUrl(defaultUrl)
                .build();
    }


    private String uploadImage(MultipartFile image, String regDate) throws IOException {

        if (image != null) {
            MultipartFile file = image;
            String uuid = UUID.randomUUID().toString();
            String originalFilename = file.getOriginalFilename();
            String fullPath = RecordUploadPath + regDate + "/" + uuid + "_" + originalFilename;
            file.transferTo(new File(fullPath));
            return regDate + "/" + uuid + "_" + originalFilename;
        }
        return null;
    }


}
