package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-46/helper"
	tokensoal "github.com/rg-km/final-project-engineering-46/token-soal"
	"github.com/rg-km/final-project-engineering-46/user"
)

// struct dependen ke service token-soal
type handlerToken struct {
	service     tokensoal.Service
	serviceUser user.Service
}

// func newHandlerToken
func NewHandlerToken(service tokensoal.Service, serviceUser user.Service) *handlerToken {
	return &handlerToken{service, serviceUser}
}

// handler validate token
func (h *handlerToken) ValidateTokenUjian(c *gin.Context) {
	currentUser := helper.IsSiswa(c)
	if currentUser.Role != "siswa" {
		return
	}

	// insisasi inputan token siswa
	var input tokensoal.InputTokenSiswa

	// binding
	err := c.ShouldBindJSON(&input)
	if err != nil {
		myErr := helper.ErrorBinding(err)
		response := helper.ResponsAPI("gagal binding", "gagal", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	// panggil funtion validasi token
	mapel, err := h.service.ValidasiTokenSoal(currentUser.Id_users, input.Token)
	if err != nil {
		myErr := gin.H{
			"error": err.Error(),
		}
		reponse := helper.ResponsAPI("gagal validasi", "gagal", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, reponse)
		return
	}

	// format response
	mapelDetail := tokensoal.TokenValidFormatter(mapel)
	data := gin.H{
		"id_mata_pelajaran": mapelDetail.IDMataPelajaran,
		"token_ujian":       mapelDetail.TokenUjian,
	}
	reponse := helper.ResponsAPI("valid", "sukses", http.StatusOK, data)
	c.JSON(http.StatusOK, reponse)
}
