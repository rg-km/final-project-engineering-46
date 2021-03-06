package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-46/auth"
	"github.com/rg-km/final-project-engineering-46/helper"
	"github.com/rg-km/final-project-engineering-46/user"
)

// bikin struct
type handlerUser struct {
	service user.Service
	auth    auth.Service
}

// function untuk newHandler
func NewHandlerUser(service user.Service, auth auth.Service) *handlerUser {
	return &handlerUser{service, auth}
}

// function buat handler login
func (h *handlerUser) LoginUser(c *gin.Context) {
	// inisiasi input login siswa
	var input user.InputLogin

	// binding inputan
	err := c.ShouldBindJSON(&input)
	if err != nil {
		// ambil error binding
		myErr := helper.ErrorBinding(err)

		// respons API
		respons := helper.ResponsAPI("Gagal binding", "Gagal", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, respons)
		return
	}

	// panggil function login diservice
	newUser, err := h.service.LoginUser(input)
	if err != nil {
		myErr := gin.H{
			"error": err.Error(),
		}
		// template respons
		respons := helper.ResponsAPI("Login Gagal", "Gagal!", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, respons)
		return
	}

	// ketika berhasil login bikinkan token dan simpan ke cookie
	token, err := h.auth.GenerateToken(newUser.Id_users)
	if err != nil {
		myErr := gin.H{
			"error": err.Error(),
		}
		// template respons
		respons := helper.ResponsAPI("Gagal membut token", "Gagal!", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, respons)
		return
	}

	// masukan token jwt sebagai response login
	data := user.ResponsLogin(token, newUser)

	// template respons api
	respons := helper.ResponsAPI("Sukses Login", "Sukses!", http.StatusOK, data)

	// return respons
	c.JSON(http.StatusOK, respons)

}
