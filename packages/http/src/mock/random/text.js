/*
    ## Text

    http://www.lipsum.com/
*/
import { natural, character } from './basic'
import { capitalize } from './helper'

function range(defaultMin, defaultMax, min, max) {
    return min === undefined ? natural(defaultMin, defaultMax) : // ()
        max === undefined ? min : // ( len )
            natural(parseInt(min, 10), parseInt(max, 10)) // ( min, max )
}

export function paragraph(min, max) {
    var len = range(3, 7, min, max)
    var result = []
    for (var i = 0; i < len; i++) {
        result.push(this.sentence())
    }
    return result.join(' ')
}
export function cparagraph(min, max) {
    var len = range(3, 7, min, max)
    var result = []
    for (var i = 0; i < len; i++) {
        result.push(this.csentence())
    }
    return result.join('')
}
export function sentence(min, max) {
    var len = range(12, 18, min, max)
    var result = []
    for (var i = 0; i < len; i++) {
        result.push(this.word())
    }
    return capitalize(result.join(' ')) + '.'
}
export function csentence(min, max) {
    var len = range(12, 18, min, max)
    var result = []
    for (var i = 0; i < len; i++) {
        result.push(this.cword())
    }

    return result.join('') + '。'
}
export function word(min, max) {
    var len = range(3, 10, min, max)
    var result = ''
    for (var i = 0; i < len; i++) {
        result += character('lower')
    }
    return result
}
export function cword(pool, min, max) {
    // 最常用的 500 个汉字 http://baike.baidu.com/view/568436.htm
    var DICT_KANZI = '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞'

    var len
    switch (arguments.length) {
        case 0: // ()
            pool = DICT_KANZI
            len = 1
            break
        case 1: // ( pool )
            if (typeof arguments[0] === 'string') {
                len = 1
            } else {
                // ( length )
                len = pool
                pool = DICT_KANZI
            }
            break
        case 2:
            // ( pool, length )
            if (typeof arguments[0] === 'string') {
                len = min
            } else {
                // ( min, max )
                len = this.natural(pool, min)
                pool = DICT_KANZI
            }
            break
        case 3:
            len = this.natural(min, max)
            break
    }

    var result = ''
    for (var i = 0; i < len; i++) {
        result += pool.charAt(this.natural(0, pool.length - 1))
    }
    return result
}
export function title(min, max) {
    var len = range(3, 7, min, max)
    var result = []
    for (var i = 0; i < len; i++) {
        result.push(this.capitalize(this.word()))
    }
    return result.join(' ')
}
export function ctitle(min, max) {
    var len = range(3, 7, min, max)
    var result = []
    for (var i = 0; i < len; i++) {
        result.push(this.cword())
    }
    return result.join('')
}