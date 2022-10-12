enum flags {
  // 屏幕大小
  MP = 0b00000001, // 手机
  TC = 0b00000010, // 平板
  PC = 0b00000100, // 电脑（普通屏）
  HD = 0b00001000, // 电脑（超大屏）

  // 屏幕角度
  R000 = 0b00010000, // 旋转0度
  R090 = 0b00100000,
  R180 = 0b01000000,
  R270 = 0b10000000,

  // 屏幕大小分组
  Mobile = MP | TC,
  Desktop = PC | HD,
  Wide = TC | PC | HD,

  // 屏幕方向分组
  Portrait = R000 | R180, // 竖直（肖像画）
  Landscape = R090 | R270, // 横放（风景画）
}

export default flags
