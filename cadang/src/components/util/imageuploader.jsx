import { useEffect, useState } from "react"
// import { Button } from "@mui/material"
import axios from "axios"
import default_image from "../../assets/default_image.png"
import styled from "styled-components"

const Uploader = (props) => {
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: default_image,
  })

  let inputRef

  const saveImage = (e) => {
    e.preventDefault()
    if (e.target.files[0]) {
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(image.preview_URL)
      const preview_URL = URL.createObjectURL(e.target.files[0])
      setImage(() => ({
        image_file: e.target.files[0],
        preview_URL: preview_URL,
      }))
    }
    console.log(e.target.files)
  }

  const deleteImage = () => {
    // createObjectURL()을 통해 생성한 기존 URL을 폐기
    URL.revokeObjectURL(image.preview_URL)
    setImage({
      image_file: "",
      preview_URL: default_image,
    })
  }

  useEffect(() => {
    // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
    return () => {
      URL.revokeObjectURL(image.preview_URL)
    }
  }, [])

  const sendImageToServer = async () => {
    if (image.image_file) {
      const formData = new FormData()
      formData.append("file", image.image_file)

      console.log(image.image_file)
      console.log(formData)

      await axios.post("/api/image/upload", formData)
      console.log("서버에 등록이 완료되었습니다!")
      setImage({
        image_file: "",
        preview_URL: default_image,
      })
    }

  }
  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleSubmit(image)
  }

  return (
    <UploaderWrapper className="uploader-wrapper">
      <form onSubmit = {handleSubmit}>
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
      </form>
      <ImgWrapper>
        <ImgSpace src={image.preview_URL} />
      </ImgWrapper>
      <div className="upload-button">
        <SelectButton variant="contained" onClick={() => inputRef.click()}>
          사진 선택
        </SelectButton>
        <DeleteButton variant="contained" onClick={deleteImage}>
          사진 삭제
        </DeleteButton>
        {/* <Button variant="contained" onClick={sendImageToServer}>
          Upload
        </Button> */}
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
const SelectButton = styled.button`
  grid-column: 3;
`
const DeleteButton = styled.button`
  grid-column: 3;
`
export default Uploader
