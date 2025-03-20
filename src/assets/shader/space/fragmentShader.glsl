uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform float uAngle;
uniform float uInterval;
varying vec2 vUv;
varying vec3 vPosition;

const float PI = 3.14159265359;
const vec3 color = vec3(0.4863, 0.6588, 1.0);

// ランダム計算
highp float rand(vec2 co){
  highp float a = 12.9898;
  highp float b = 78.233;
  highp float c = 43758.5453;
  highp float dt= dot(co.xy ,vec2(a,b));
  highp float sn= mod(dt,3.14);
  return fract(sin(sn) * c);
}

// 外積計算
float crs(vec2 v1, vec2 v2) {
  return v1.x*v2.y - v1.y*v2.x;
}

void main() {
  // 正規化
  vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
  // スピード
  float speed = uSpeed * -uTime;
  // 角度
  float angle = uAngle;
  // 間隔
  float interval = uInterval;
  // 円形エフェクト
  float pct = distance(sin(p), vec2(0.)) * 5.;
  // 角度の中心値
  float r = floor(degrees(atan(p.y, p.x)) / angle) * angle + angle / 2.;
  // ラジアンへ変換
  float rad = radians(r);
  // pがその方向からどのくらい離れているか
  float l = abs(crs(vec2(cos(rad),sin(rad)), p));
  // 調整
  float a = (length(p) + 0.1);
  // 特定の境界条件でのみ l を有効
  float b = step(l, 0.001);
  // ランダムの放射線
  float c = mod(length(p) + speed * (1. + rand(vec2(r, r) * 2.)) + rand(vec2(r, r)), interval) - .5;

  l = a * b * c;
  gl_FragColor = vec4(vec3(l * pct * color), 1.);
}