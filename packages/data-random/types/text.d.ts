type text = string
interface RandomMethods_Text {
    paragraph(minLength?: nummeric, maxLength?: nummeric): text

    cparagraph(minLength?: nummeric, maxLength?: nummeric): text

    sentence(minLength?: nummeric, maxLength?: nummeric): text

    csentence(minLength?: nummeric, maxLength?: nummeric): text

    word(minLength?: nummeric, maxLength?: nummeric): text

    cword(): text
    cword(length: nummeric): text
    cword(minLength: nummeric, maxLength: nummeric): text
    cword(pool: string, minLength: nummeric, maxLength: nummeric): text

    title(minLength?: nummeric, maxLength?: nummeric): text

    ctitle(minLength?: nummeric, maxLength?: nummeric): text
}