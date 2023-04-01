package main

import (
	"strconv"
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

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	r := gin.Default()
	dsn := "golang_react:golang_react@tcp(127.0.0.1:3306)/golang_react?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		return
	}

	r.Use(CORSMiddleware())

	r.PATCH("/update/:id", func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			return
		}

		var todoItem ToDoItem

		if err := c.BindJSON(&todoItem); err != nil {
			return
		}

		todoItem.Id = id
		db.Model(&todoItem).Where("id = ?", id).Update("title", todoItem.Title)
		c.JSON(200, todoItem)
	})

	r.PATCH("/completed/:id", func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			return
		}

		var todoItem ToDoItem

		if err := c.BindJSON(&todoItem); err != nil {
			return
		}

		todoItem.Id = id
		db.Model(&todoItem).Where("id = ?", id).Update("status", todoItem.Status)
		c.JSON(200, todoItem)
	})

	r.DELETE("/delete/:id", func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			return
		}

		var todoItem ToDoItem

		todoItem.Id = id
		db.Delete(&todoItem)
		c.JSON(200, todoItem)
	})

	r.POST("/create", func(c *gin.Context) {
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

	r.GET("/select", func(c *gin.Context) {
		var todoItem []ToDoItem
		result := db.Order("id desc").Find(&todoItem)
		if result.Error != nil {
			return
		}
		c.JSON(200, todoItem)
	})

	r.Run()
}
