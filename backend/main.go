package main

import (
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type ToDoItem struct {
	Id        int        `json:"id" gorm:"column:id;"`
	Title     string     `json:"title" gorm:"column:title;"`
	Status    string     `json:"status" gorm:"column:status;"`
	CreatedAt *time.Time `json:"created_at" gorm:"column:created_at;"`
	UpdatedAt *time.Time `json:"updated_at" gorm:"column:updated_at;"`
}

func main() {
	r := gin.Default()
	dsn := "golang_react:golang_react@tcp(127.0.0.1:3306)/golang_react?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		return
	}

	r.POST("/ping", func(c *gin.Context) {
		var todoItem ToDoItem

		if err := c.BindJSON(&todoItem); err != nil {
			return
		}

		result := db.Create(&todoItem)

		if result.Error != nil {
			return
		}

		c.JSON(200, todoItem)
	})

	r.Run()
}
