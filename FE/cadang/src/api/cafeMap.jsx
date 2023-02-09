import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmFiMTIzNCIsImlkIjoxOSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NTk4Nzc5NX0.B4bnh2yLtLC6Ps25ntRECNx2oXInlnksj9xL4_UWujMIQwn8SdMtAyD5Po_4AzLYDFjjHqE-Uefw0DgGt_xAYA",
    "Content-Type": "application/json",
  },
});

