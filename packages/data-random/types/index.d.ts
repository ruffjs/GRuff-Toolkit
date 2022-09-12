type Numeric = string | number

type IntNumeric = Numeric

type FloatNumeric = Numeric

type Bool = 'true' | 'false' | boolean

type ObjectNotation = string | object

type ObjectEmpty = {}

type RandomExtendsOptions = Record<string, AnyFn>
type RandomMethods = RandomMethods_Address &
  RandomMethods_Basic &
  RandomMethods_Color &
  RandomMethods_Data &
  RandomMethods_Image &
  RandomMethods_Key &
  RandomMethods_Name &
  RandomMethods_Text &
  RandomMethods_Web &
  RandomMethods_Helper
