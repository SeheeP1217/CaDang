import { useEffect, useState, useMemo } from "react"
// import axios from "axios"
import default_image from "../../assets/default_image.png"
import styled from "styled-components"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"
import { useLocation } from "react-router-dom"

const ModifyProfileImageUploader = (props) => {
  const originalImage =
    props.defaultImage !== ""
      ? `http://i8a808.p.ssafy.io/images/profile/${props.defaultImage}`
      : default_image
  const [imageStatus, setImageStatus] = useState({
    image_file: null,
    preview_URL: originalImage,
  })

  let inputRef

  useEffect(() => {
    setImageStatus({
      image_file: null,
      preview_URL: originalImage,
    })
  }, [props.defaultImage])
  console.log(imageStatus.image_file)

  useEffect(
    function () {
      props.getImg(imageStatus.image_file, imageStatus.preview_URL)
    },
    [imageStatus]
  )
  console.log(imageStatus.image_file)
  console.log(typeof imageStatus.image_file)

  console.log(imageStatus.preview_URL)

  const saveImage = (e) => {
    if (e.target.files[0]) {
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(imageStatus.preview_URL)
      const preview_URL = URL.createObjectURL(e.target.files[0])
      setImageStatus(() => ({
        image_file: e.target.files[0],
        preview_URL: preview_URL,
      }))
      props.changeImg()
    }
  }

  const deleteImage = () => {
    // createObjectURL()을 통해 생성한 기존 URL을 폐기
    URL.revokeObjectURL(imageStatus.preview_URL)
    setImageStatus({
      image_file: null,
      preview_URL: default_image,
    })
    props.deleteImg()
  }

  useEffect(() => {
    // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
    return () => {
      URL.revokeObjectURL(imageStatus.preview_URL)
    }
  }, [])
  console.log(imageStatus.preview_URL)

  return (
    <UploaderWrapper className="uploader-wrapper">
      <input
        type="file"
        accept="image/*"
        onChange={saveImage}
        // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
        // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: "none" }}
      />
      <ImgWrapper className="img-wrapper">
        <ImgSpace
          // src={originalImage}
          src={imageStatus.preview_URL}
          alt="img"
          onClick={() => inputRef.click()}
          style={{
            borderRadius: "100%",
            width: "100px",
            height: "100px",
            objectFit: "cover",
          }}
        />
      </ImgWrapper>
      <div className="upload-button">
        <IconContainer>
          <AddAPhotoIcon variant="contained"></AddAPhotoIcon>
        </IconContainer>
        <DeleteButton color="error" variant="contained" onClick={deleteImage}>
          기본이미지로 변경
        </DeleteButton>
      </div>
    </UploaderWrapper>
  )
}

const UploaderWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`
const ImgWrapper = styled.div`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100px;
  margin-top: 7px;
  margin-left: 10px;
`
const ImgSpace = styled.img`
  width: 100%;
`
const DeleteButton = styled.button`
  grid-area: DeleteButton;
  margin-left: 8px;
  border-radius: 5px !important;
  border: 2px solid #674f04 !important;
  background-color: #ffffff !important;
  color: 350B !important;
`
const IconContainer = styled.div`
  position: absolute;
  bottom: 40px;
  left: 75px;
  z-index: 1;
  background-color: white;
  border-radius: 20px !important;
  border: 2px solid black !important;
  width: 33px;
  height: 33px;
  padding: 3px;
`

export default ModifyProfileImageUploader
