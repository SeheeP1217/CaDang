import { margin, width } from "@mui/system"
import { useEffect, useState } from "react"
// import axios from "axios"
import styled from "styled-components"

const ImageModifier = (props) => {
  const getImg = props.getImg
  const changeImg = props.changeImg
  const deleteImg = props.deleteImg
  const beforeModifyImage = props.beforeModifyImage

  const [imagestatus, setImageStatus] = useState({
    image_file: "",
    preview_URL: beforeModifyImage,
  })

  let inputRef

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
      preview_URL: beforeModifyImage,
    })
    deleteImg()
  }

  useEffect(() => {
    // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
    return () => {
      URL.revokeObjectURL(imagestatus.preview_URL)
    }
  }, [])

  const sendImageToServer = async () => {
    if (imagestatus.image_file) {
      // const formData = new FormData()
      // formData.append("file", imagestatus.image_file)
      // await axios.post("/api/image/upload", formData)
      // console.log(imagestatus.image_file)
      getImg(imagestatus.image_file, imagestatus.preview_URL)
      changeImg()
      alert("서버에 등록이 완료되었습니다!")
      // setImageStatus({
      //   image_file: "",
      //   preview_URL: default_image,
      // })
    } else {
      alert("사진을 등록하세요!")
    }
  }

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
        <SelectButton variant="contained" onClick={() => inputRef.click()}>
          교체
        </SelectButton>
        <DeleteButton color="error" variant="contained" onClick={deleteImage}>
          삭제
        </DeleteButton>
        <SaveButton
          color="success"
          variant="contained"
          onClick={sendImageToServer}
        >
          저장
        </SaveButton>
      </div>
    </UploaderWrapper>
  )
}

const UploaderWrapper = styled.div`
  margin: auto;
  display: card;
`
const ImgWrapper = styled.div`
  width: 100px;
  margin: auto;
`
const ImgSpace = styled.img`
  width: 100%;
`
const SelectButton = styled.button``
const DeleteButton = styled.button``
const SaveButton = styled.button``

export default ImageModifier
