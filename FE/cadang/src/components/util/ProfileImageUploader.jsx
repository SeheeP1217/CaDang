import { useEffect, useState } from "react"
import { Button } from "@mui/material"
// import axios from "axios"
import default_image from "../../assets/default_image.png"
import styled from "styled-components"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"

const ProfileImageUploader = ({ getImg }) => {
  const [imagestatus, setImageStatus] = useState({
    image_file: "",
    preview_URL: default_image,
  })

  //컴포넌트 이름 바꾸기

  let inputRef

  useEffect(
    function () {
      getImg(imagestatus.image_file, imagestatus.preview_URL)
    },
    [imagestatus]
  )

  const saveImage = (e) => {
    e.preventDefault()
    if (e.target.files[0]) {
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(imagestatus.preview_URL)
      const preview_URL = URL.createObjectURL(e.target.files[0])
      setImageStatus(() => ({
        image_file: e.target.files[0],
        preview_URL: preview_URL,
      }))
    }
  }

  const deleteImage = () => {
    // createObjectURL()을 통해 생성한 기존 URL을 폐기
    URL.revokeObjectURL(imagestatus.preview_URL)
    setImageStatus({
      image_file: "",
      preview_URL: default_image,
    })
  }

  useEffect(() => {
    // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
    return () => {
      URL.revokeObjectURL(imagestatus.preview_URL)
    }
  }, [])

  return (
    <UploaderWrapper className="uploader-wrapper">
      <input
        type="file"
        accept="image/*"
        onChange={saveImage}
        // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
        // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
        onClick={(e) => (e.target.value = null)}
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: "none" }}
      />
      <ImgWrapper className="img-wrapper">
        <ImgSpace src={imagestatus.preview_URL} alt="img" />
      </ImgWrapper>
      <div className="upload-button">
        <AddAPhotoIcon
          variant="contained"
          onClick={() => inputRef.click()}
        ></AddAPhotoIcon>
        <DeleteButton color="error" variant="contained" onClick={deleteImage}>
          기본이미지로 변경
        </DeleteButton>
      </div>
    </UploaderWrapper>
  )
}

const UploaderWrapper = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 0.5fr 2fr 3fr 0.5fr;
  grid-gap: 30px;
`
const ImgWrapper = styled.div`
  width: 100px;
  grid-column: 2;
`
const ImgSpace = styled.img`
  width: 100%;
`
const DeleteButton = styled.button`
  grid-column: 3;
`
const SaveButton = styled.button`
  grid-column: 3;
`


export default ProfileImageUploader
