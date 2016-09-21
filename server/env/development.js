module.exports = {
	"DATABASE_URI": "postgres://localhost:5432/fsg",
	"SESSION_SECRET": "Optimus Prime is my real dad",
	"TWITTER": {
		"consumerKey": "5g3nBFblpoe3iRd6u58VH0XW7",
		"consumerSecret": "dJK8OcZ55YMFH35CC6oDBw10394tomHA52XDCSE7ZigA4pq73y",
		"callbackUrl": "http://127.0.0.1:1337/auth/twitter/callback"
	},
	"FACEBOOK": {
		"clientID": "1177819392249145",
		"clientSecret": "e7946023b3d6e6d14de5b917cbe074a3",
		"callbackURL": "http://localhost:1337/auth/facebook/callback"
	},
	"GOOGLE": {
		"clientID": "766064247510-p8b6gg4i61np46n5bb43ungae3sltpme.apps.googleusercontent.com",
		"clientSecret": "PB1ErPkAsr63s5zUymapXJAo",
		"callbackURL": "http://127.0.0.1:1337/auth/google/callback"
	}
};