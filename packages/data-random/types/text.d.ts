type text = string
interface RandomMethods_Text {
    paragraph(minLength?: Numeric, maxLength?: Numeric): text

    cparagraph(minLength?: Numeric, maxLength?: Numeric): text

    sentence(minLength?: Numeric, maxLength?: Numeric): text

    csentence(minLength?: Numeric, maxLength?: Numeric): text

    word(minLength?: Numeric, maxLength?: Numeric): text

    cword(length?: Numeric): text
    cword(minLength: Numeric, maxLength: Numeric): text
    cword(pool: string, minLength: Numeric, maxLength: Numeric): text

    title(minLength?: Numeric, maxLength?: Numeric): text

    ctitle(minLength?: Numeric, maxLength?: Numeric): text
}