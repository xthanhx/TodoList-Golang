package main

import "github.com/gin-gonic/gin"

func indexHandler(c *gin.Context) {
	c.HTML(200, "form.html", nil)
}

func main() {
	r := gin.Default()
	r.LoadHTMLGlob("views/*")

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.GET("/", indexHandler)

	r.GET("/someJSON", func(c *gin.Context) {
		data := map[string]interface{}{
			"lang": "GO语言đâsđâsd dsa dasd sad asá",
			"tag":  "<br>",
		}
		c.AsciiJSON(200, data)
	})

	r.Run()
}
