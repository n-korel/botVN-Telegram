package main

import (
	"fmt"
	"log"
	"os"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

func main() {
	botToken := os.Getenv("BOT_TOKEN")
    if botToken == "" {
        fmt.Println("BOT_TOKEN не задан")
    }

	bot, err := tgbotapi.NewBotAPI(botToken)
	if err != nil {
		log.Fatal(err)
	}

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	updates := bot.GetUpdatesChan(u)

	for update := range updates {
		if update.Message != nil && update.Message.IsCommand() {
			if update.Message.Command() == "start" {
				msg := tgbotapi.NewMessage(
					update.Message.Chat.ID,
					"Ты просыпаешься в тёмной комнате.",
				)
				bot.Send(msg)
			}
		}
	}
}
