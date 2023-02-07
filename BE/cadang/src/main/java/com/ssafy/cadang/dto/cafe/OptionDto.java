package com.ssafy.cadang.dto.cafe;

import com.ssafy.cadang.domain.custom.Option;
import com.ssafy.cadang.domain.custom.Type;
import lombok.Data;

@Data
public class OptionDto {

    Long id;
    Long franchiseId;
    Type type;
    Integer caffeine;
    Integer sugar;
    int price;
    int cal;

    public OptionDto(Option option) {

        id = option.getId();
        franchiseId = option.getFranchise().getId();
        type = option.getType();
        caffeine = option.getCaffeine();
        sugar = option.getSugar();
        price = option.getPrice();
        cal = option.getCal();

    }

}
