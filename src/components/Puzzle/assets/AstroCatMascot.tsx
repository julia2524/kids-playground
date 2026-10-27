// export default AstroCatMascot;

// import React from "react";
// import Svg, {
//   G,
//   Path,
//   Circle,
//   Ellipse,
//   Rect,
//   Defs,
//   LinearGradient,
//   RadialGradient,
//   Stop,
// } from "react-native-svg";

// interface AstroCatMascotProps {
//   size?: number;
// }

// export const AstroCatMascot: React.FC<AstroCatMascotProps> = ({
//   size = 300,
// }) => {
//   return (
//     <Svg width={size} height={size} viewBox="0 0 500 500">
//       <Defs>
//         {/* 고양이 귀 */}
//         <LinearGradient id="earOuterGrad" x1="0" y1="0" x2="1" y2="1">
//           <Stop offset="0" stopColor="#D8B8FF" />
//           <Stop offset="0.35" stopColor="#A173FF" />
//           <Stop offset="0.72" stopColor="#894DEB" />
//           <Stop offset="1" stopColor="#632DC1" />
//         </LinearGradient>

//         <LinearGradient id="earInnerGrad" x1="0" y1="0" x2="0" y2="1">
//           <Stop offset="0" stopColor="#FFB8EA" />
//           <Stop offset="1" stopColor="#FF82D2" />
//         </LinearGradient>

//         {/* 얼굴의 부드러운 입체감 */}
//         <RadialGradient id="catFaceGrad" cx="45%" cy="35%" rx="70%" ry="75%">
//           <Stop offset="0" stopColor="#F0DFFF" />
//           <Stop offset="0.35" stopColor="#D2B2FF" />
//           <Stop offset="0.72" stopColor="#B18AF8" />
//           <Stop offset="1" stopColor="#8750DE" />
//         </RadialGradient>

//         <RadialGradient id="faceLightGrad" cx="50%" cy="20%" r="80%">
//           <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.65" />
//           <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
//         </RadialGradient>

//         {/* 눈 */}
//         <RadialGradient id="eyeGrad" cx="30%" cy="20%" r="90%">
//           <Stop offset="0" stopColor="#583875" />
//           <Stop offset="0.45" stopColor="#29143F" />
//           <Stop offset="0.8" stopColor="#160C2A" />
//           <Stop offset="1" stopColor="#493067" />
//         </RadialGradient>

//         {/* 헬멧 외곽 */}
//         <LinearGradient id="helmetFrameGrad" x1="0" y1="0" x2="0.2" y2="1">
//           <Stop offset="0" stopColor="#FFFFFF" />
//           <Stop offset="0.25" stopColor="#FFFEFF" />
//           <Stop offset="0.55" stopColor="#F1ECFF" />
//           <Stop offset="0.78" stopColor="#DCD2F8" />
//           <Stop offset="1" stopColor="#A995E4" />
//         </LinearGradient>

//         <LinearGradient id="helmetSideGrad" x1="0" y1="0" x2="1" y2="0">
//           <Stop offset="0" stopColor="#C9BAF4" />
//           <Stop offset="0.5" stopColor="#FFFFFF" />
//           <Stop offset="1" stopColor="#B7A3EC" />
//         </LinearGradient>

//         {/* 유리 바이저 */}
//         <RadialGradient id="visorGrad" cx="48%" cy="35%" r="75%">
//           <Stop offset="0" stopColor="#B8D8FF" stopOpacity="0.18" />
//           <Stop offset="0.7" stopColor="#879AFF" stopOpacity="0.3" />
//           <Stop offset="1" stopColor="#5655C9" stopOpacity="0.62" />
//         </RadialGradient>

//         <LinearGradient id="visorEdgeGrad" x1="0" y1="0" x2="1" y2="1">
//           <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.85" />
//           <Stop offset="0.45" stopColor="#B9B8FF" stopOpacity="0.2" />
//           <Stop offset="1" stopColor="#6E67CF" stopOpacity="0.7" />
//         </LinearGradient>

//         <LinearGradient id="visorShineGrad" x1="0" y1="0" x2="1" y2="1">
//           <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
//           <Stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.38" />
//           <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
//         </LinearGradient>

//         {/* LED */}
//         <LinearGradient id="ledGrad" x1="0" y1="0" x2="1" y2="0">
//           <Stop offset="0" stopColor="#A4FFFF" />
//           <Stop offset="0.5" stopColor="#55F8FF" />
//           <Stop offset="1" stopColor="#22CFFF" />
//         </LinearGradient>

//         {/* 입과 혀 */}
//         <LinearGradient id="tongueGrad" x1="0" y1="0" x2="0" y2="1">
//           <Stop offset="0" stopColor="#FF9BCB" />
//           <Stop offset="1" stopColor="#F14F98" />
//         </LinearGradient>

//         {/* 별 */}
//         <LinearGradient id="starGrad" x1="0" y1="0" x2="0" y2="1">
//           <Stop offset="0" stopColor="#FFFCA0" />
//           <Stop offset="0.35" stopColor="#FFE85A" />
//           <Stop offset="0.72" stopColor="#FFC526" />
//           <Stop offset="1" stopColor="#FF9900" />
//         </LinearGradient>

//         <LinearGradient id="starSideGrad" x1="0" y1="0" x2="0" y2="1">
//           <Stop offset="0" stopColor="#FFCB36" />
//           <Stop offset="1" stopColor="#F28B00" />
//         </LinearGradient>

//         <RadialGradient id="cheekGrad" cx="40%" cy="30%" r="75%">
//           <Stop offset="0" stopColor="#FFD4EF" />
//           <Stop offset="0.65" stopColor="#FF9DDA" />
//           <Stop offset="1" stopColor="#FF80CE" stopOpacity="0.85" />
//         </RadialGradient>
//       </Defs>

//       {/* ==================================================
//           1. 뒤쪽 고양이 귀
//       ================================================== */}
//       <G>
//         {/* 왼쪽 귀 그림자 */}
//         <Path
//           d="M82 185 C57 117 67 44 112 25 C155 5 205 38 226 91 L207 177 Z"
//           fill="#7743CE"
//         />

//         {/* 왼쪽 귀 */}
//         <Path
//           d="M78 178 C72 116 85 49 119 35 C155 22 193 56 210 103 L190 177 Z"
//           fill="url(#earOuterGrad)"
//         />

//         {/* 왼쪽 귓속 */}
//         <Path
//           d="M103 150 C98 106 108 62 127 56 C150 52 174 78 187 112 L169 153 Z"
//           fill="url(#earInnerGrad)"
//         />

//         <Path
//           d="M91 111 C94 79 105 48 124 43"
//           fill="none"
//           stroke="#E7D2FF"
//           strokeWidth={8}
//           strokeLinecap="round"
//           opacity={0.7}
//         />

//         {/* 오른쪽 귀 그림자 */}
//         <Path
//           d="M292 94 C323 40 378 17 422 43 C459 66 458 132 431 190 L365 178 Z"
//           fill="#7743CE"
//         />

//         {/* 오른쪽 귀 */}
//         <Path
//           d="M307 105 C333 58 381 35 414 54 C443 71 440 126 419 175 L362 163 Z"
//           fill="url(#earOuterGrad)"
//         />

//         {/* 오른쪽 귓속 */}
//         <Path
//           d="M335 111 C356 78 389 64 408 76 C426 89 421 122 406 153 L367 143 Z"
//           fill="url(#earInnerGrad)"
//         />

//         <Path
//           d="M325 100 C347 67 377 50 400 56"
//           fill="none"
//           stroke="#E7D2FF"
//           strokeWidth={8}
//           strokeLinecap="round"
//           opacity={0.65}
//         />
//       </G>

//       {/* ==================================================
//           2. 뒤쪽 수트와 좌우 이어패드
//       ================================================== */}
//       <G>
//         {/* 몸통 실루엣 */}
//         <Path
//           d="M135 326 C125 374 131 416 165 439
//              C190 456 310 456 335 439
//              C369 416 375 374 365 326 Z"
//           fill="#8860E9"
//         />

//         {/* 몸통 밝은 면 */}
//         <Path
//           d="M157 347 C151 385 158 417 183 434
//              C205 445 295 445 317 434
//              C342 417 349 385 343 347 Z"
//           fill="url(#helmetFrameGrad)"
//         />

//         {/* 왼쪽 이어패드 */}
//         <Ellipse cx={66} cy={244} rx={51} ry={71} fill="#7550D0" />
//         <Ellipse cx={70} cy={235} rx={47} ry={66} fill="url(#earOuterGrad)" />
//         <Ellipse
//           cx={56}
//           cy={220}
//           rx={25}
//           ry={39}
//           fill="#C6A7FF"
//           opacity={0.25}
//         />

//         {/* 왼쪽 LED */}
//         <Rect
//           x={25}
//           y={199}
//           width={17}
//           height={57}
//           rx={8.5}
//           fill="#FFFFFF"
//           opacity={0.55}
//         />
//         <Rect
//           x={29}
//           y={204}
//           width={10}
//           height={47}
//           rx={5}
//           fill="url(#ledGrad)"
//         />

//         {/* 오른쪽 이어패드 */}
//         <Ellipse cx={434} cy={244} rx={51} ry={71} fill="#7550D0" />
//         <Ellipse cx={430} cy={235} rx={47} ry={66} fill="url(#earOuterGrad)" />
//         <Ellipse
//           cx={418}
//           cy={220}
//           rx={25}
//           ry={39}
//           fill="#C6A7FF"
//           opacity={0.25}
//         />

//         {/* 오른쪽 LED */}
//         <Rect
//           x={448}
//           y={199}
//           width={17}
//           height={57}
//           rx={8.5}
//           fill="#FFFFFF"
//           opacity={0.55}
//         />
//         <Rect
//           x={452}
//           y={204}
//           width={10}
//           height={47}
//           rx={5}
//           fill="url(#ledGrad)"
//         />
//       </G>

//       {/* ==================================================
//           4. 유리 바이저
//       ================================================== */}
//       <G>
//         {/* 유리의 푸른빛 */}
//         <Path
//           d="M250 99
//              C348 99 401 151 401 228
//              C401 306 347 354 250 354
//              C153 354 99 306 99 228
//              C99 151 152 99 250 99 Z"
//           fill="url(#visorGrad)"
//         />

//         {/* 바이저 테두리의 반사 */}
//         <Path
//           d="M250 103
//              C345 103 395 153 395 228"
//           fill="none"
//           stroke="url(#visorEdgeGrad)"
//           strokeWidth={5}
//           strokeLinecap="round"
//         />

//         {/* 좌측 상단 큰 반사광 */}
//         <Path
//           d="M119 174
//              C130 151 151 132 177 122
//              C189 118 197 126 190 136
//              C176 151 151 165 132 185
//              C122 194 114 187 119 174 Z"
//           fill="url(#visorShineGrad)"
//         />

//         {/* 좌측 작은 반사광 */}
//         <Path
//           d="M101 210
//              C104 198 112 187 120 184
//              C126 183 126 190 123 198
//              L113 219
//              C107 229 98 221 101 210 Z"
//           fill="#FFFFFF"
//           opacity={0.65}
//         />

//         {/* 우측 상단 유리 반사 */}
//         <Path
//           d="M320 112
//              Q343 115 357 130"
//           fill="none"
//           stroke="#FFFFFF"
//           strokeWidth={8}
//           strokeLinecap="round"
//           opacity={0.85}
//         />

//         <Ellipse
//           cx={367}
//           cy={146}
//           rx={9}
//           ry={4}
//           fill="#FFFFFF"
//           opacity={0.7}
//           transform="rotate(35 367 146)"
//         />
//       </G>

//       {/* ==================================================
//           5. 두툼한 헬멧 외곽 프레임
//       ================================================== */}
//       <G>
//         {/* 외곽 그림자 */}
//         <Path
//           d="M250 53
//              C126 53 55 119 55 229
//              C55 326 115 384 250 384
//              C385 384 445 326 445 229
//              C445 119 374 53 250 53 Z"
//           fill="#A18ADF"
//         />

//         {/* 프레임 본체 */}
//         <Path
//           d="M250 53
//              C128 53 61 119 61 229
//              C61 323 119 375 250 375
//              C381 375 439 323 439 229
//              C439 119 372 53 250 53 Z
//              M250 94
//              C344 94 399 145 399 229
//              C399 303 349 346 250 346
//              C151 346 101 303 101 229
//              C101 145 156 94 250 94 Z"
//           fill="url(#helmetFrameGrad)"
//           fillRule="evenodd"
//         />

//         {/* 상단의 부드러운 하이라이트 */}
//         <Path
//           d="M131 86
//              C164 65 207 59 250 60
//              C291 60 328 70 352 86"
//           fill="none"
//           stroke="#FFFFFF"
//           strokeWidth={12}
//           strokeLinecap="round"
//           opacity={0.85}
//         />

//         <Path
//           d="M113 131
//              C133 111 159 99 188 94"
//           fill="none"
//           stroke="#FFFFFF"
//           strokeWidth={5}
//           strokeLinecap="round"
//           opacity={0.65}
//         />

//         {/* 하단 프레임의 부드러운 그림자 */}
//         <Path
//           d="M116 320
//              C145 357 189 367 250 367
//              C311 367 355 357 384 320"
//           fill="none"
//           stroke="#B4A1E9"
//           strokeWidth={7}
//           strokeLinecap="round"
//           opacity={0.55}
//         />
//       </G>

//       {/* ==================================================
//           3. 고양이 얼굴
//       ================================================== */}
//       <G>
//         {/* 얼굴 실루엣 */}
//         <Path
//           d="M111 226
//              C108 177 137 139 179 130
//              C211 119 231 130 250 143
//              C269 130 289 119 321 130
//              C363 139 392 177 389 226
//              C386 295 343 352 250 356
//              C157 352 114 295 111 226 Z"
//           fill="url(#catFaceGrad)"
//         />

//         {/* 얼굴 중앙의 부드러운 빛 */}
//         <Ellipse
//           cx={250}
//           cy={224}
//           rx={137}
//           ry={108}
//           fill="url(#faceLightGrad)"
//         />

//         {/* 이마 줄무늬 */}
//         <Path
//           d="M210 145 C210 163 217 175 225 178
//              C233 173 235 159 232 143 Z"
//           fill="#9667E7"
//           opacity={0.75}
//         />
//         <Path
//           d="M239 140 C237 159 242 175 250 179
//              C258 175 263 159 261 140 Z"
//           fill="#9667E7"
//           opacity={0.75}
//         />
//         <Path
//           d="M268 143 C265 159 267 173 275 178
//              C284 175 291 163 290 145 Z"
//           fill="#9667E7"
//           opacity={0.75}
//         />

//         {/* 왼쪽 눈 */}
//         <Ellipse
//           cx={190}
//           cy={243}
//           rx={34}
//           ry={42}
//           fill="#6E48A7"
//           opacity={0.35}
//         />
//         <Ellipse cx={190} cy={240} rx={31} ry={37} fill="url(#eyeGrad)" />
//         <Ellipse cx={179} cy={222} rx={9} ry={12} fill="#FFFFFF" />
//         <Circle cx={174} cy={239} r={4.5} fill="#FFFFFF" />
//         <Path
//           d="M204 235 L209 245 L219 249 L209 254
//              L204 264 L199 254 L189 249 L199 245 Z"
//           fill="#FFF16A"
//         />

//         {/* 오른쪽 눈 */}
//         <Ellipse
//           cx={310}
//           cy={243}
//           rx={34}
//           ry={42}
//           fill="#6E48A7"
//           opacity={0.35}
//         />
//         <Ellipse cx={310} cy={240} rx={31} ry={37} fill="url(#eyeGrad)" />
//         <Ellipse cx={299} cy={222} rx={9} ry={12} fill="#FFFFFF" />
//         <Circle cx={294} cy={239} r={4.5} fill="#FFFFFF" />
//         <Path
//           d="M324 235 L329 245 L339 249 L329 254
//              L324 264 L319 254 L309 249 L319 245 Z"
//           fill="#FFF16A"
//         />

//         {/* 코 */}
//         <Path
//           d="M240 264
//              Q250 257 260 264
//              Q259 273 250 276
//              Q241 273 240 264 Z"
//           fill="#49245F"
//         />
//         <Ellipse cx={247} cy={263} rx={3} ry={2} fill="#B68CDA" opacity={0.8} />

//         {/* 웃는 입 */}
//         <Path
//           d="M224 275
//              Q237 289 250 276
//              Q263 289 276 275"
//           fill="none"
//           stroke="#49234F"
//           strokeWidth={5}
//           strokeLinecap="round"
//         />

//         <Path
//           d="M230 280
//              Q250 290 270 280
//              Q270 308 250 311
//              Q230 308 230 280 Z"
//           fill="#49234F"
//         />

//         <Path
//           d="M235 289
//              Q250 295 265 289
//              Q264 306 250 308
//              Q236 306 235 289 Z"
//           fill="url(#tongueGrad)"
//         />

//         {/* 볼터치 */}
//         <Ellipse
//           cx={157}
//           cy={282}
//           rx={25}
//           ry={17}
//           fill="url(#cheekGrad)"
//           transform="rotate(-10 157 282)"
//         />
//         <Ellipse
//           cx={343}
//           cy={282}
//           rx={25}
//           ry={17}
//           fill="url(#cheekGrad)"
//           transform="rotate(10 343 282)"
//         />

//         <Ellipse
//           cx={150}
//           cy={278}
//           rx={5}
//           ry={3}
//           fill="#FFFFFF"
//           opacity={0.65}
//         />
//         <Ellipse
//           cx={336}
//           cy={278}
//           rx={5}
//           ry={3}
//           fill="#FFFFFF"
//           opacity={0.65}
//         />

//         {/* 수염 */}
//         <G fill="none" stroke="#8854D5" strokeWidth={6} strokeLinecap="round">
//           <Path d="M116 261 L138 263" />
//           <Path d="M120 278 L139 272" />
//           <Path d="M384 261 L362 263" />
//           <Path d="M380 278 L361 272" />
//         </G>
//       </G>
//       {/* ==================================================
//           6. 하단 목 링과 LED
//       ================================================== */}
//       <G>
//         <Path
//           d="M155 363
//              C181 386 319 386 345 363
//              L335 413
//              C314 441 186 441 165 413 Z"
//           fill="url(#helmetSideGrad)"
//         />

//         <Path
//           d="M166 374
//              C194 395 306 395 334 374
//              L326 404
//              C304 425 196 425 174 404 Z"
//           fill="#E5DDFB"
//         />

//         {/* LED 외곽 캡슐 */}
//         <Rect
//           x={190}
//           y={378}
//           width={120}
//           height={36}
//           rx={18}
//           fill="#A48AEF"
//           stroke="#D9CBFF"
//           strokeWidth={3}
//         />

//         <Rect
//           x={205}
//           y={387}
//           width={90}
//           height={19}
//           rx={9.5}
//           fill="url(#ledGrad)"
//         />

//         <Path
//           d="M214 391 L246 391"
//           fill="none"
//           stroke="#FFFFFF"
//           strokeWidth={3}
//           strokeLinecap="round"
//           opacity={0.8}
//         />
//       </G>

//       {/* ==================================================
//           7. 별 배지와 반짝임
//       ================================================== */}
//       <G>
//         {/* 별 주변의 흰색 후광 테두리 */}
//         <Path
//           d="M365 344
//              C363 331 377 323 389 330
//              L403 339
//              L419 337
//              C434 335 441 349 432 360
//              L422 371
//              L426 387
//              C429 402 416 410 403 403
//              L389 396
//              L375 405
//              C362 414 349 404 353 390
//              L357 375
//              L347 363
//              C337 352 345 339 359 341 Z"
//           fill="#FFFFFF"
//           stroke="#E9DDFD"
//           strokeWidth={5}
//         />

//         {/* 별의 입체 그림자 */}
//         <Path
//           d="M387 344
//              L399 357
//              L417 359
//              L404 373
//              L407 391
//              L389 382
//              L372 391
//              L375 373
//              L362 359
//              L380 357 Z"
//           fill="url(#starSideGrad)"
//           transform="translate(0 5)"
//         />

//         {/* 별 본체 */}
//         <Path
//           d="M387 337
//              Q391 336 394 344
//              L400 355
//              L414 357
//              Q423 359 416 366
//              L405 376
//              L408 390
//              Q409 399 401 394
//              L389 387
//              L376 394
//              Q368 398 370 389
//              L373 376
//              L363 366
//              Q356 359 365 357
//              L379 355 Z"
//           fill="url(#starGrad)"
//           stroke="#FFB322"
//           strokeWidth={3}
//           strokeLinejoin="round"
//         />

//         {/* 별 상단 광택 */}
//         <Path
//           d="M374 359 Q379 347 386 345"
//           fill="none"
//           stroke="#FFFFFF"
//           strokeWidth={5}
//           strokeLinecap="round"
//           opacity={0.9}
//         />

//         <Circle cx={393} cy={351} r={3} fill="#FFFFFF" opacity={0.9} />

//         {/* 위쪽 반짝임 */}
//         <Rect
//           x={419}
//           y={326}
//           width={15}
//           height={29}
//           rx={7.5}
//           fill="#FFFFFF"
//           transform="rotate(42 426.5 340.5)"
//         />
//         <Rect
//           x={423}
//           y={329}
//           width={8}
//           height={21}
//           rx={4}
//           fill="#FFC62F"
//           transform="rotate(42 427 339.5)"
//         />

//         {/* 오른쪽 반짝임 */}
//         <Rect
//           x={430}
//           y={361}
//           width={28}
//           height={15}
//           rx={7.5}
//           fill="#FFFFFF"
//           transform="rotate(-8 444 368.5)"
//         />
//         <Rect
//           x={434}
//           y={365}
//           width={20}
//           height={7}
//           rx={3.5}
//           fill="#FFC62F"
//           transform="rotate(-8 444 368.5)"
//         />
//       </G>
//     </Svg>
//   );
// };

import React from "react";
import Svg, {
  G,
  Path,
  Circle,
  Ellipse,
  Rect,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from "react-native-svg";

interface AstroCatMascotProps {
  size?: number;
}

export const AstroCatMascot: React.FC<AstroCatMascotProps> = ({
  size = 300,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 500 540" fill="none">
      <Defs>
        <LinearGradient id="earOuterGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#D8B8FF" />
          <Stop offset="0.35" stopColor="#A173FF" />
          <Stop offset="0.72" stopColor="#894DEB" />
          <Stop offset="1" stopColor="#632DC1" />
        </LinearGradient>

        <LinearGradient id="earInnerGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFB8EA" />
          <Stop offset="1" stopColor="#FF82D2" />
        </LinearGradient>

        <RadialGradient id="catFaceGrad" cx="45%" cy="35%" rx="70%" ry="75%">
          <Stop offset="0" stopColor="#F0DFFF" />
          <Stop offset="0.35" stopColor="#D2B2FF" />
          <Stop offset="0.72" stopColor="#B18AF8" />
          <Stop offset="1" stopColor="#8750DE" />
        </RadialGradient>

        <RadialGradient id="faceLightGrad" cx="50%" cy="20%" r="80%">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.75" />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </RadialGradient>

        <RadialGradient id="eyeGrad" cx="30%" cy="20%" r="90%">
          <Stop offset="0" stopColor="#583875" />
          <Stop offset="0.45" stopColor="#29143F" />
          <Stop offset="0.8" stopColor="#160C2A" />
          <Stop offset="1" stopColor="#493067" />
        </RadialGradient>

        <LinearGradient id="helmetFrameGrad" x1="0" y1="0" x2="0.2" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="0.25" stopColor="#FFFEFF" />
          <Stop offset="0.55" stopColor="#F1ECFF" />
          <Stop offset="0.78" stopColor="#DCD2F8" />
          <Stop offset="1" stopColor="#A995E4" />
        </LinearGradient>

        <LinearGradient id="helmetSideGrad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#C9BAF4" />
          <Stop offset="0.5" stopColor="#FFFFFF" />
          <Stop offset="1" stopColor="#B7A3EC" />
        </LinearGradient>

        <RadialGradient id="visorGrad" cx="48%" cy="35%" r="75%">
          <Stop offset="0" stopColor="#E2F1FF" stopOpacity="0.04" />
          <Stop offset="0.7" stopColor="#B4C7FF" stopOpacity="0.1" />
          <Stop offset="1" stopColor="#879AFF" stopOpacity="0.18" />
        </RadialGradient>

        <LinearGradient id="visorShineGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <Stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.35" />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </LinearGradient>

        <LinearGradient id="ledGrad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#A4FFFF" />
          <Stop offset="0.5" stopColor="#55F8FF" />
          <Stop offset="1" stopColor="#22CFFF" />
        </LinearGradient>

        <LinearGradient id="tongueGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FF9BCB" />
          <Stop offset="1" stopColor="#F14F98" />
        </LinearGradient>

        <LinearGradient id="starGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFCA0" />
          <Stop offset="0.35" stopColor="#FFE85A" />
          <Stop offset="0.72" stopColor="#FFC526" />
          <Stop offset="1" stopColor="#FF9900" />
        </LinearGradient>

        <LinearGradient id="starSideGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFCB36" />
          <Stop offset="1" stopColor="#F28B00" />
        </LinearGradient>

        <RadialGradient id="cheekGrad" cx="40%" cy="30%" r="75%">
          <Stop offset="0" stopColor="#FFD4EF" />
          <Stop offset="0.65" stopColor="#FF9DDA" />
          <Stop offset="1" stopColor="#FF80CE" stopOpacity="0.85" />
        </RadialGradient>
      </Defs>

      {/* 1. 헬멧 뒤쪽의 큰 고양이 귀 */}
      <G>
        <Path
          d="M82 185 C57 117 67 44 112 25 C155 5 205 38 226 91 L207 177 Z"
          fill="#7743CE"
        />
        <Path
          d="M78 178 C72 116 85 49 119 35 C155 22 193 56 210 103 L190 177 Z"
          fill="url(#earOuterGrad)"
        />
        <Path
          d="M103 150 C98 106 108 62 127 56 C150 52 174 78 187 112 L169 153 Z"
          fill="url(#earInnerGrad)"
        />
        <Path
          d="M91 111 C94 79 105 48 124 43"
          stroke="#E7D2FF"
          strokeWidth={8}
          strokeLinecap="round"
          opacity={0.7}
        />

        <Path
          d="M292 94 C323 40 378 17 422 43 C459 66 458 132 431 190 L365 178 Z"
          fill="#7743CE"
        />
        <Path
          d="M307 105 C333 58 381 35 414 54 C443 71 440 126 419 175 L362 163 Z"
          fill="url(#earOuterGrad)"
        />
        <Path
          d="M335 111 C356 78 389 64 408 76 C426 89 421 122 406 153 L367 143 Z"
          fill="url(#earInnerGrad)"
        />
        <Path
          d="M325 100 C347 67 377 50 400 56"
          stroke="#E7D2FF"
          strokeWidth={8}
          strokeLinecap="round"
          opacity={0.65}
        />
      </G>

      {/* 2. 우주복 몸통, 팔, 부츠 */}
      <G>
        <Path
          d="M155 350
             C132 385 142 445 176 474
             C195 491 220 500 250 500
             C280 500 305 491 324 474
             C358 445 368 385 345 350 Z"
          fill="url(#helmetFrameGrad)"
          stroke="#A995E4"
          strokeWidth={4}
          strokeLinejoin="round"
        />

        {/* 왼팔 */}
        <Path
          d="M160 365
             C132 369 111 386 91 410
             C81 422 84 438 98 444
             C112 450 125 435 139 421
             L166 395 Z"
          fill="url(#helmetFrameGrad)"
          stroke="#A995E4"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <Ellipse
          cx={96}
          cy={432}
          rx={17}
          ry={20}
          transform="rotate(25 96 432)"
          fill="url(#earOuterGrad)"
          stroke="#7743CE"
          strokeWidth={3}
        />
        <Path
          d="M88 423 Q96 416 103 425"
          stroke="#E7D2FF"
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* 오른팔 */}
        <Path
          d="M340 365
             C368 369 389 386 409 410
             C419 422 416 438 402 444
             C388 450 375 435 361 421
             L334 395 Z"
          fill="url(#helmetFrameGrad)"
          stroke="#A995E4"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <Ellipse
          cx={404}
          cy={432}
          rx={17}
          ry={20}
          transform="rotate(-25 404 432)"
          fill="url(#earOuterGrad)"
          stroke="#7743CE"
          strokeWidth={3}
        />
        <Path
          d="M397 425 Q404 416 412 423"
          stroke="#E7D2FF"
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* 가슴 패널 */}
        <Rect
          x={207}
          y={422}
          width={86}
          height={27}
          rx={9}
          fill="#E5DDFB"
          stroke="#9A82D0"
          strokeWidth={2}
        />
        <Circle cx={223} cy={435} r={4} fill="#FF5C77" />
        <Circle cx={240} cy={435} r={4} fill="#3EC5FF" />
        <Circle cx={257} cy={435} r={4} fill="#2FE3B3" />
        <Circle cx={274} cy={435} r={4} fill="#FFC93C" />

        {/* 부츠 */}
        <Path
          d="M178 466 Q173 481 177 495 Q185 508 211 507 L228 502 L226 485 Z"
          fill="url(#earOuterGrad)"
          stroke="#7743CE"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <Path
          d="M272 485 L270 502 L289 507 Q315 508 323 495 Q327 481 322 466 Z"
          fill="url(#earOuterGrad)"
          stroke="#7743CE"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <Path
          d="M183 493 Q199 500 220 495"
          stroke="#D9C4FF"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <Path
          d="M280 495 Q301 500 317 493"
          stroke="#D9C4FF"
          strokeWidth={4}
          strokeLinecap="round"
        />
      </G>

      {/* 3. 헬멧 양쪽 이어패드와 LED */}
      <G>
        <Ellipse cx={66} cy={244} rx={51} ry={71} fill="#7550D0" />
        <Ellipse cx={70} cy={235} rx={47} ry={66} fill="url(#earOuterGrad)" />
        <Ellipse
          cx={56}
          cy={220}
          rx={25}
          ry={39}
          fill="#C6A7FF"
          opacity={0.25}
        />
        <Rect
          x={25}
          y={199}
          width={17}
          height={57}
          rx={8.5}
          fill="#FFFFFF"
          opacity={0.55}
        />
        <Rect
          x={29}
          y={204}
          width={10}
          height={47}
          rx={5}
          fill="url(#ledGrad)"
        />

        <Ellipse cx={434} cy={244} rx={51} ry={71} fill="#7550D0" />
        <Ellipse cx={430} cy={235} rx={47} ry={66} fill="url(#earOuterGrad)" />
        <Ellipse
          cx={418}
          cy={220}
          rx={25}
          ry={39}
          fill="#C6A7FF"
          opacity={0.25}
        />
        <Rect
          x={448}
          y={199}
          width={17}
          height={57}
          rx={8.5}
          fill="#FFFFFF"
          opacity={0.55}
        />
        <Rect
          x={452}
          y={204}
          width={10}
          height={47}
          rx={5}
          fill="url(#ledGrad)"
        />
      </G>

      {/* 4. 헬멧 안쪽 찐빵 스타일 얼굴 및 귀 */}
      <G>
        {/* 헬멧 안쪽 왼쪽 귀 */}
        <Path
          d="M145 140 C135 100 150 80 175 95 C190 105 195 130 185 150 Z"
          fill="url(#earOuterGrad)"
          stroke="#7743CE"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <Path
          d="M155 130 C150 105 160 92 172 102 C180 110 182 125 175 138 Z"
          fill="url(#earInnerGrad)"
        />

        {/* 헬멧 안쪽 오른쪽 귀 */}
        <Path
          d="M355 140 C365 100 350 80 325 95 C310 105 305 130 315 150 Z"
          fill="url(#earOuterGrad)"
          stroke="#7743CE"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <Path
          d="M345 130 C350 105 340 92 328 102 C320 110 318 125 325 138 Z"
          fill="url(#earInnerGrad)"
        />

        {/* 찐빵 스타일의 넓고 통통한 얼굴형 */}
        <Path
          d="M100 210
             C95 150 130 110 180 100
             C210 95 235 105 250 115
             C265 105 290 95 320 100
             C370 110 405 150 400 210
             C395 285 350 345 250 350
             C150 345 105 285 100 210 Z"
          fill="url(#catFaceGrad)"
        />
        <Ellipse
          cx={250}
          cy={220}
          rx={140}
          ry={105}
          fill="url(#faceLightGrad)"
        />

        {/* 이마 줄무늬 */}
        <Path
          d="M215 125 C215 143 222 155 230 158 C238 153 240 139 237 123 Z"
          fill="#9667E7"
          opacity={0.75}
        />
        <Path
          d="M244 120 C242 139 247 155 255 159 C263 155 268 139 266 120 Z"
          fill="#9667E7"
          opacity={0.75}
        />
        <Path
          d="M273 123 C270 139 272 153 280 158 C288 155 295 143 294 125 Z"
          fill="#9667E7"
          opacity={0.75}
        />

        {/* 왼쪽 눈 */}
        <Ellipse
          cx={185}
          cy={225}
          rx={35}
          ry={43}
          fill="#6E48A7"
          opacity={0.35}
        />
        <Ellipse
          cx={185}
          cy={222}
          rx={31}
          ry={37}
          fill="url(#eyeGrad)"
          stroke="#38204F"
          strokeWidth={1.5}
        />
        <Ellipse cx={174} cy={204} rx={9} ry={12} fill="#FFFFFF" />
        <Circle cx={169} cy={221} r={4.5} fill="#FFFFFF" />
        <Path
          d="M199 217 L204 227 L214 231 L204 236 L199 246 L194 236 L184 231 L194 227 Z"
          fill="#FFF16A"
        />

        {/* 오른쪽 눈 */}
        <Ellipse
          cx={315}
          cy={225}
          rx={35}
          ry={43}
          fill="#6E48A7"
          opacity={0.35}
        />
        <Ellipse
          cx={315}
          cy={222}
          rx={31}
          ry={37}
          fill="url(#eyeGrad)"
          stroke="#38204F"
          strokeWidth={1.5}
        />
        <Ellipse cx={304} cy={204} rx={9} ry={12} fill="#FFFFFF" />
        <Circle cx={299} cy={221} r={4.5} fill="#FFFFFF" />
        <Path
          d="M329 217 L334 227 L344 231 L334 236 L329 246 L324 236 L314 231 L324 227 Z"
          fill="#FFF16A"
        />

        {/* 코 */}
        <Path
          d="M240 246 Q250 239 260 246 Q259 255 250 258 Q241 255 240 246 Z"
          fill="#49245F"
        />
        <Ellipse cx={247} cy={245} rx={3} ry={2} fill="#B68CDA" opacity={0.8} />

        {/* 웃는 입과 혀 */}
        <Path
          d="M224 257 Q237 271 250 258 Q263 271 276 257"
          stroke="#49234F"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <Path
          d="M230 262 Q250 272 270 262 Q270 290 250 293 Q230 290 230 262 Z"
          fill="#49234F"
        />
        <Path
          d="M235 271 Q250 277 265 271 Q264 288 250 290 Q236 288 235 271 Z"
          fill="url(#tongueGrad)"
        />

        {/* 볼터치 */}
        <Ellipse
          cx={150}
          cy={265}
          rx={26}
          ry={18}
          fill="url(#cheekGrad)"
          transform="rotate(-10 150 265)"
        />
        <Ellipse
          cx={350}
          cy={265}
          rx={26}
          ry={18}
          fill="url(#cheekGrad)"
          transform="rotate(10 350 265)"
        />
        <Ellipse
          cx={143}
          cy={261}
          rx={5}
          ry={3}
          fill="#FFFFFF"
          opacity={0.65}
        />
        <Ellipse
          cx={343}
          cy={261}
          rx={5}
          ry={3}
          fill="#FFFFFF"
          opacity={0.65}
        />

        {/* 수염 */}
        <G fill="none" stroke="#8854D5" strokeWidth={5} strokeLinecap="round">
          <Path d="M112 243 L134 245" />
          <Path d="M116 260 L135 254" />
          <Path d="M388 243 L366 245" />
          <Path d="M384 260 L365 254" />
        </G>
      </G>

      {/* 5. 투명 바이저 및 반사광 */}
      <G>
        <Path
          d="M250 99
             C348 99 401 151 401 228
             C401 306 347 354 250 354
             C153 354 99 306 99 228
             C99 151 152 99 250 99 Z"
          fill="url(#visorGrad)"
        />
        <Path
          d="M119 174
             C130 151 151 132 177 122
             C189 118 197 126 190 136
             C176 151 151 165 132 185
             C122 194 114 187 119 174 Z"
          fill="url(#visorShineGrad)"
        />
        <Path
          d="M101 210
             C104 198 112 187 120 184
             C126 183 126 190 123 198
             L113 219
             C107 229 98 221 101 210 Z"
          fill="#FFFFFF"
          opacity={0.3}
        />
        <Path
          d="M320 112 Q343 115 357 130"
          stroke="#FFFFFF"
          strokeWidth={7}
          strokeLinecap="round"
          opacity={0.8}
        />
        <Ellipse
          cx={367}
          cy={146}
          rx={9}
          ry={4}
          fill="#FFFFFF"
          opacity={0.65}
          transform="rotate(35 367 146)"
        />
      </G>

      {/* 6. 헬멧 외곽 프레임 (링 형태) */}
      <G>
        <Path
          d="M250 53
             C128 53 61 119 61 229
             C61 323 119 375 250 375
             C381 375 439 323 439 229
             C439 119 372 53 250 53 Z
             M250 94
             C344 94 399 145 399 229
             C399 303 349 346 250 346
             C151 346 101 303 101 229
             C101 145 156 94 250 94 Z"
          fill="url(#helmetFrameGrad)"
          fillRule="evenodd"
        />
        <Path
          d="M131 86
             C164 65 207 59 250 60
             C291 60 328 70 352 86"
          stroke="#FFFFFF"
          strokeWidth={10}
          strokeLinecap="round"
          opacity={0.85}
        />
        <Path
          d="M113 131 C133 111 159 99 188 94"
          stroke="#FFFFFF"
          strokeWidth={5}
          strokeLinecap="round"
          opacity={0.65}
        />
        <Path
          d="M116 320
             C145 357 189 367 250 367
             C311 367 355 357 384 320"
          stroke="#B4A1E9"
          strokeWidth={6}
          strokeLinecap="round"
          opacity={0.55}
        />
      </G>

      {/* 7. 목 연결부 및 LED */}
      <G>
        <Path
          d="M170 363
             C190 380 310 380 330 363
             L320 403
             C300 425 200 425 180 403 Z"
          fill="url(#helmetSideGrad)"
          stroke="#B7A3EC"
          strokeWidth={2}
        />
        <Path
          d="M178 372
             C196 388 304 388 322 372
             L316 398
             C300 415 200 415 184 398 Z"
          fill="#E5DDFB"
        />
        <Rect
          x={195}
          y={375}
          width={110}
          height={32}
          rx={16}
          fill="#A48AEF"
          stroke="#D9CBFF"
          strokeWidth={3}
        />
        <Rect
          x={205}
          y={382}
          width={90}
          height={18}
          rx={9}
          fill="url(#ledGrad)"
        />
        <Path
          d="M214 388 L246 388"
          stroke="#FFFFFF"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.8}
        />
      </G>

      {/* 8. 우측 하단 별 배지 */}
      <G>
        <Path
          d="M365 344
             C363 331 377 323 389 330
             L403 339 L419 337
             C434 335 441 349 432 360
             L422 371 L426 387
             C429 402 416 410 403 403
             L389 396 L375 405
             C362 414 349 404 353 390
             L357 375 L347 363
             C337 352 345 339 359 341 Z"
          fill="#FFFFFF"
          stroke="#E9DDFD"
          strokeWidth={5}
        />
        <Path
          d="M387 344
             L399 357 L417 359 L404 373
             L407 391 L389 382 L372 391
             L375 373 L362 359 L380 357 Z"
          fill="url(#starSideGrad)"
          transform="translate(0 5)"
        />
        <Path
          d="M387 337
             Q391 336 394 344
             L400 355 L414 357
             Q423 359 416 366
             L405 376 L408 390
             Q409 399 401 394
             L389 387 L376 394
             Q368 398 370 389
             L373 376 L363 366
             Q356 359 365 357
             L379 355 Z"
          fill="url(#starGrad)"
          stroke="#FFB322"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <Path
          d="M374 359 Q379 347 386 345"
          stroke="#FFFFFF"
          strokeWidth={5}
          strokeLinecap="round"
          opacity={0.9}
        />
        <Circle cx={393} cy={351} r={3} fill="#FFFFFF" opacity={0.9} />
        <Rect
          x={419}
          y={326}
          width={15}
          height={29}
          rx={7.5}
          fill="#FFFFFF"
          transform="rotate(42 426.5 340.5)"
        />
        <Rect
          x={423}
          y={329}
          width={8}
          height={21}
          rx={4}
          fill="#FFC62F"
          transform="rotate(42 427 339.5)"
        />
        <Rect
          x={430}
          y={361}
          width={28}
          height={15}
          rx={7.5}
          fill="#FFFFFF"
          transform="rotate(-8 444 368.5)"
        />
        <Rect
          x={434}
          y={365}
          width={20}
          height={7}
          rx={3.5}
          fill="#FFC62F"
          transform="rotate(-8 444 368.5)"
        />
      </G>
    </Svg>
  );
};

export default AstroCatMascot;
