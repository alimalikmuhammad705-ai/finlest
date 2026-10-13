import os

def generate_svg():
    svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <!-- 1. Shield Interior: Deep Midnight Navy Gradient -->
    <linearGradient id="shieldBg" x1="250" y1="130" x2="250" y2="420" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#07142a" />
      <stop offset="40%" stop-color="#050e1f" />
      <stop offset="100%" stop-color="#030812" />
    </linearGradient>

    <!-- 2. Shield Bevel / Outer Border Gradient -->
    <linearGradient id="shieldBorderGrad" x1="150" y1="130" x2="350" y2="420" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#56bde8" />
      <stop offset="25%" stop-color="#1e97d4" />
      <stop offset="60%" stop-color="#0c6fa8" />
      <stop offset="100%" stop-color="#054c79" />
    </linearGradient>

    <!-- 3. Inner Pinstripe Rim -->
    <linearGradient id="innerRimGrad" x1="250" y1="150" x2="250" y2="400" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#7dd3fc" stop-opacity="0.9" />
      <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0.3" />
    </linearGradient>

    <!-- 4. Crown Gradient -->
    <linearGradient id="crownGrad" x1="250" y1="50" x2="250" y2="150" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#7dd3fc" />
      <stop offset="25%" stop-color="#38bdf8" />
      <stop offset="65%" stop-color="#0ea5e9" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>

    <!-- 5. Jewel Finial Radial Gradient -->
    <radialGradient id="pearlGrad" cx="35%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="35%" stop-color="#93e0fd" />
      <stop offset="70%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#034870" />
    </radialGradient>

    <!-- 6. Acanthus Flourish Master Gradient -->
    <linearGradient id="acanthusGrad" x1="80" y1="130" x2="220" y2="440" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#7dd3fc" />
      <stop offset="18%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#0284c7" />
      <stop offset="80%" stop-color="#0369a1" />
      <stop offset="100%" stop-color="#075985" />
    </linearGradient>

    <!-- 7. Acanthus Rib / Highlight Gradient -->
    <linearGradient id="ribGrad" x1="100" y1="150" x2="200" y2="400" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#bae6fd" stop-opacity="0.9" />
      <stop offset="50%" stop-color="#7dd3fc" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.2" />
    </linearGradient>

    <!-- 8. "KA" Monogram Crisp Gradient -->
    <linearGradient id="letterGrad" x1="240" y1="210" x2="240" y2="335" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="65%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#e2e8f0" />
    </linearGradient>

    <!-- 9. Marine Wave Gradient -->
    <linearGradient id="waveGrad" x1="140" y1="285" x2="335" y2="280" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="35%" stop-color="#67e8f9" />
      <stop offset="70%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>

    <!-- Depth Filter: Crisp Heraldic Ambient Shadow -->
    <filter id="crestShadow" x="-12%" y="-12%" width="124%" height="124%">
      <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#010611" flood-opacity="0.65" />
    </filter>

    <!-- ======================================================== -->
    <!-- MASTER LEFT ACANTHUS SCROLLWORK (Mirrored 100% on Right) -->
    <!-- ======================================================== -->
    <g id="mantlingLeft">
      <!-- Top Flourish: inward curl framing crown base -->
      <path d="M 178 145 
               C 160 135, 142 134, 132 144
               C 124 152, 126 164, 134 170
               C 140 174, 148 172, 150 164
               C 152 156, 144 154, 140 158
               C 138 152, 144 146, 152 146
               C 162 146, 172 152, 176 160 Z"
            fill="url(#acanthusGrad)" />

      <!-- Upper Shoulder Volute: bold S-curve flaring outward -->
      <path d="M 154 168
               C 136 160, 112 162, 98 178
               C 84 194, 82 216, 94 230
               C 102 240, 116 240, 122 232
               C 126 226, 122 216, 114 214
               C 106 212, 102 220, 106 226
               C 98 216, 100 202, 110 192
               C 124 178, 142 178, 156 186
               C 150 196, 146 210, 146 226
               C 142 208, 144 186, 154 168 Z"
            fill="url(#acanthusGrad)" />

      <!-- Middle Foliate Plume: sweeping outward leaf -->
      <path d="M 94 230
               C 82 244, 76 262, 78 282
               C 80 300, 92 312, 106 316
               C 118 318, 126 310, 126 300
               C 126 290, 118 286, 110 290
               C 106 294, 106 300, 110 304
               C 104 302, 98 294, 98 284
               C 98 270, 108 256, 120 248
               C 130 242, 138 244, 144 250
               C 138 238, 126 232, 114 232
               C 104 232, 98 236, 94 230 Z"
            fill="url(#acanthusGrad)" />

      <!-- Lower Waist Volute: prominent heraldic spiral scroll -->
      <path d="M 104 316
               C 88 332, 80 354, 86 376
               C 92 398, 112 412, 134 414
               C 154 414, 168 402, 168 384
               C 168 368, 152 358, 138 366
               C 128 372, 130 384, 140 388
               C 146 390, 152 386, 150 378
               C 148 372, 140 370, 136 374
               C 128 382, 122 368, 126 356
               C 130 342, 142 334, 156 332
               C 168 330, 180 338, 184 352
               C 180 336, 166 322, 148 322
               C 132 322, 116 324, 104 316 Z"
            fill="url(#acanthusGrad)" />

      <!-- Bottom Sweeping Horn / Leaf under shield tip -->
      <path d="M 158 404
               C 174 418, 194 430, 218 438
               C 230 442, 242 444, 250 446
               C 246 440, 236 432, 226 422
               C 212 408, 198 390, 190 370
               C 186 384, 178 398, 166 406
               C 158 410, 148 410, 140 404
               C 148 406, 154 406, 158 404 Z"
            fill="url(#acanthusGrad)" />

      <!-- Inner Acanthus Rib Highlights (Layered 3D Definition) -->
      <path d="M 144 180 C 130 182, 114 196, 112 214 C 118 202, 130 192, 144 188 Z"
            fill="url(#ribGrad)" />
      <path d="M 114 246 C 102 260, 100 278, 108 296 C 110 282, 118 270, 130 262 Z"
            fill="url(#ribGrad)" />
      <path d="M 132 332 C 114 348, 112 370, 122 390 C 124 374, 134 358, 150 348 Z"
            fill="url(#ribGrad)" />
      <path d="M 172 412 C 190 422, 212 432, 234 438 C 218 430, 202 418, 186 406 Z"
            fill="url(#ribGrad)" />
    </g>
  </defs>

  <!-- ======================================================== -->
  <!-- MAIN CREST ASSEMBLY                                      -->
  <!-- ======================================================== -->
  <g filter="url(#crestShadow)">

    <!-- 1. ACANTHUS MANTLING: Left and Exact Symmetrical Right -->
    <use href="#mantlingLeft" />
    <use href="#mantlingLeft" transform="scale(-1, 1) translate(-500, 0)" />

    <!-- Centered Bottom Acanthus Terminal Finial under apex -->
    <path d="M 250 430
             C 244 438, 238 444, 230 450
             C 240 451, 246 454, 250 460
             C 254 454, 260 451, 270 450
             C 262 444, 256 438, 250 430 Z"
          fill="url(#acanthusGrad)" />

    <!-- 2. HERALDIC SHIELD (OUTER BEVEL BORDER) -->
    <path d="M 250 142
             C 226 138, 190 146, 162 164
             C 156 168, 152 174, 154 182
             C 150 216, 150 258, 158 298
             C 168 344, 202 392, 250 428
             C 298 392, 332 344, 342 298
             C 350 258, 350 216, 346 182
             C 348 174, 344 168, 338 164
             C 310 146, 274 138, 250 142 Z"
          fill="url(#shieldBorderGrad)" />

    <!-- 3. SHIELD INTERIOR (MIDNIGHT NAVY CAVITY) -->
    <path d="M 250 152
             C 228 148, 196 156, 170 172
             C 164 210, 164 252, 172 292
             C 182 336, 212 380, 250 414
             C 288 380, 318 336, 328 292
             C 336 252, 336 210, 330 172
             C 304 156, 272 148, 250 152 Z"
          fill="url(#shieldBg)" />

    <!-- 4. INNER PINSTRIPE ACCENT RIM -->
    <path d="M 250 162
             C 230 158, 202 165, 180 178
             C 174 212, 174 250, 182 286
             C 190 328, 218 370, 250 400
             C 282 370, 310 328, 318 286
             C 326 250, 326 212, 320 178
             C 298 165, 270 158, 250 162 Z"
          fill="none" stroke="url(#innerRimGrad)" stroke-width="2" />

    <!-- 5. THE ROYAL CROWN -->
    <!-- Crown Body -->
    <path d="M 188 149
             C 180 128, 168 104, 160 88
             C 172 104, 186 112, 196 96
             C 200 90, 202 76, 204 62
             C 216 86, 228 98, 238 82
             C 244 72, 247 56, 250 45
             C 253 56, 256 72, 262 82
             C 272 98, 284 86, 296 62
             C 298 76, 300 90, 304 96
             C 314 112, 328 104, 340 88
             C 332 104, 320 128, 312 149
             C 292 142, 271 138, 250 138
             C 229 138, 208 142, 188 149 Z"
          fill="url(#crownGrad)" />

    <!-- Crown Base Headband -->
    <path d="M 184 152
             C 205 144, 227 140, 250 140
             C 273 140, 295 144, 316 152
             C 295 158, 273 162, 250 162
             C 227 162, 205 158, 184 152 Z"
          fill="#38bdf8" />
    <path d="M 190 153
             C 210 146, 230 142, 250 142
             C 270 142, 290 146, 310 153"
          stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity="0.9" />

    <!-- 5 Crown Pearls (Jewels) -->
    <!-- Center Pearl -->
    <circle cx="250" cy="45" r="9" fill="url(#pearlGrad)" stroke="#38bdf8" stroke-width="1" />
    <!-- Intermediate Pearls -->
    <circle cx="204" cy="62" r="7.5" fill="url(#pearlGrad)" stroke="#38bdf8" stroke-width="1" />
    <circle cx="296" cy="62" r="7.5" fill="url(#pearlGrad)" stroke="#38bdf8" stroke-width="1" />
    <!-- Outer Pearls -->
    <circle cx="160" cy="88" r="7" fill="url(#pearlGrad)" stroke="#38bdf8" stroke-width="1" />
    <circle cx="340" cy="88" r="7" fill="url(#pearlGrad)" stroke="#38bdf8" stroke-width="1" />

    <!-- ======================================================== -->
    <!-- 6. THE "KA" MONOGRAM & SIGNATURE MARINE WAVE              -->
    <!-- ======================================================== -->

    <!-- LETTER "K" (Classical Serif Typography) -->
    <!-- K Vertical Stem -->
    <path d="M 172 222
             H 204
             V 230
             H 194
             V 324
             H 204
             V 332
             H 172
             V 324
             H 182
             V 230
             H 172
             Z"
          fill="url(#letterGrad)" />

    <!-- K Upper Diagonal Arm -->
    <path d="M 194 278
             L 232 230
             H 220
             V 222
             H 252
             V 230
             L 214 278
             Z"
          fill="url(#letterGrad)" />

    <!-- K Lower Diagonal Leg -->
    <path d="M 206 268
             L 242 324
             H 232
             V 332
             H 264
             V 324
             C 256 324, 250 320, 244 312
             L 218 274
             Z"
          fill="url(#letterGrad)" />

    <!-- LETTER "A" (Classical Serif Typography) -->
    <!-- A Left Diagonal Stroke -->
    <path d="M 276 222
             H 286
             L 252 324
             H 244
             V 332
             H 230
             V 324
             H 238
             L 272 222
             Z"
          fill="url(#letterGrad)" />

    <!-- A Right Diagonal Stroke + Apex -->
    <path d="M 276 222
             L 316 324
             H 326
             V 332
             H 296
             V 324
             H 304
             L 294 298
             H 264
             L 282 248
             L 286 222
             Z"
          fill="url(#letterGrad)" />

    <!-- A Apex Top Serif -->
    <path d="M 268 222 H 294 V 226 H 268 Z" fill="url(#letterGrad)" />

    <!-- ======================================================== -->
    <!-- 7. SIGNATURE FLOWING MARINE WAVE RIBBON                  -->
    <!-- ======================================================== -->
    <!-- Ocean Wave Body: Flowing across the waist of K and crossbar of A -->
    <path d="M 166 295
             C 184 286, 208 278, 232 278
             C 256 278, 276 286, 298 284
             C 314 282, 328 274, 340 268
             C 330 278, 314 288, 296 290
             C 272 292, 252 284, 228 284
             C 204 284, 184 294, 166 295 Z"
          fill="url(#waveGrad)" />

    <!-- White Crest Highlight Line on Wave -->
    <path d="M 172 293
             C 192 284, 214 278, 234 278
             C 258 278, 278 286, 300 284
             C 314 282, 326 276, 336 270"
          stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity="0.9" />

  </g>
</svg>
'''
    return svg

with open('public/images/king-crest.svg', 'w', encoding='utf-8') as f:
    f.write(generate_svg())

print('Saved public/images/king-crest.svg')
