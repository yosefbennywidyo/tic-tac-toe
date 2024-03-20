# README

A player has_one :game
A game belongs_to :player
A game has_many :moves
Moves belongs_to :game

A player has_many :moves, through: :game
Moves has_one :player, through: :game

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
