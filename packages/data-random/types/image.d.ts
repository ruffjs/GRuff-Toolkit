const _adSize = [
    '300x250', '250x250', '240x400', '336x280', '180x150',
    '720x300', '468x60', '234x60', '88x31', '120x90',
    '120x60', '120x240', '125x125', '728x90', '160x600',
    '120x600', '300x600'
] as const

const _screenSize = [
    '320x200', '320x240', '640x480', '800x480', '800x480',
    '1024x600', '1024x768', '1280x800', '1440x900', '1920x1200',
    '2560x1600'
] as const

const _videoSize = ['720x480', '768x576', '1280x720', '1920x1080'] as const

type RandomBrands = "4ormat" |
    "500px" |
    "About.me (blue)" |
    "About.me (yellow)" |
    "Addvocate" |
    "Adobe" |
    "Aim" |
    "Amazon" |
    "Android" |
    "Angie's List" |
    "AOL" |
    "Atlassian" |
    "Behance" |
    "Big Cartel" |
    "bitly" |
    "Blogger" |
    "Boeing" |
    "Booking.com" |
    "Carbonmade" |
    "Cheddar" |
    "Code School" |
    "Delicious" |
    "Dell" |
    "Designmoo" |
    "Deviantart" |
    "Designer News" |
    "Devour" |
    "DEWALT" |
    "Disqus (blue)" |
    "Disqus (orange)" |
    "Dribbble" |
    "Dropbox" |
    "Drupal" |
    "Dunked" |
    "eBay" |
    "Ember" |
    "Engadget" |
    "Envato" |
    "Etsy" |
    "Evernote" |
    "Fab.com" |
    "Facebook" |
    "Firefox" |
    "Flickr (blue)" |
    "Flickr (pink)" |
    "Forrst" |
    "Foursquare" |
    "Garmin" |
    "GetGlue" |
    "Gimmebar" |
    "GitHub" |
    "Google Blue" |
    "Google Green" |
    "Google Red" |
    "Google Yellow" |
    "Google+" |
    "Grooveshark" |
    "Groupon" |
    "Hacker News" |
    "HelloWallet" |
    "Heroku (light)" |
    "Heroku (dark)" |
    "HootSuite" |
    "Houzz" |
    "HTML5" |
    "IKEA" |
    "IMDb" |
    "Instagram" |
    "Intel" |
    "Intuit" |
    "Kickstarter" |
    "kippt" |
    "Kodery" |
    "LastFM" |
    "LinkedIn" |
    "Livestream" |
    "Lumo" |
    "Mixpanel" |
    "Meetup" |
    "Nokia" |
    "NVIDIA" |
    "Opera" |
    "Path" |
    "PayPal (dark)" |
    "PayPal (light)" |
    "Pinboard" |
    "Pinterest" |
    "PlayStation" |
    "Pocket" |
    "Prezi" |
    "Pusha" |
    "Quora" |
    "QUOTE.fm" |
    "Rdio" |
    "Readability" |
    "Red Hat" |
    "Resource" |
    "Rockpack" |
    "Roon" |
    "RSS" |
    "Salesforce" |
    "Samsung" |
    "Shopify" |
    "Skype" |
    "Snagajob" |
    "Softonic" |
    "SoundCloud" |
    "Space Box" |
    "Spotify" |
    "Sprint" |
    "Squarespace" |
    "StackOverflow" |
    "Staples" |
    "Status Chart" |
    "Stripe" |
    "StudyBlue" |
    "StumbleUpon" |
    "T-Mobile" |
    "Technorati" |
    "The Next Web" |
    "Treehouse" |
    "Trulia" |
    "Tumblr" |
    "Twitch.tv" |
    "Twitter" |
    "TYPO3" |
    "Ubuntu" |
    "Ustream" |
    "Verizon" |
    "Vimeo" |
    "Vine" |
    "Virb" |
    "Virgin Media" |
    "Wooga" |
    "WordPress (blue)" |
    "WordPress (orange)" |
    "WordPress (grey)" |
    "Wunderlist" |
    "XBOX" |
    "XING" |
    "Yahoo!" |
    "Yandex" |
    "Yelp" |
    "YouTube" |
    "Zalongo" |
    "Zendesk" |
    "Zerply" |
    "Zootool"

type RandomAdSize = typeof _adSize[number]
type RandomScreenSize = typeof _screenSize[number]
type RandomVideoSize = typeof _videoSize[number]
type RandomImageType = 'png' | 'gif' | 'jpg'

interface RandomMethods_Image {
    _adSize: RandomAdSize[]
    _screenSize: RandomScreenSize[]
    _videoSize: RandomVideoSize[]
    _brandColors: Record<RandomBrands, RandomHashColor>

    _brandNames(): RandomBrands[]

    image(
        size: RandomAdSize | RandomScreenSize | RandomVideoSize | nummeric,
        background: RandomColorName | RandomHashColor,
        text: string): string
    image(
        size: RandomAdSize | RandomScreenSize | RandomVideoSize | nummeric,
        background: RandomColorName | RandomHashColor,
        foreground: RandomColorName | RandomHashColor,
        text: string): string
    image(
        size: RandomAdSize | RandomScreenSize | RandomVideoSize | nummeric,
        background: RandomColorName | RandomHashColor,
        foreground: RandomColorName | RandomHashColor,
        format: RandomImageType,
        text: string): string

    //  img = image

    dataImage(size: RandomAdSize | RandomScreenSize | RandomVideoSize | nummeric, text: string): string
}