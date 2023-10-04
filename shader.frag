precision mediump float;

varying vec2 vTexCoord;

uniform vec2 screenSize;
uniform vec2 mousePos;
uniform vec2 offset;
uniform vec4 uMaterialColor;
uniform float angle;
uniform float distOffset;

vec2 rotate(vec2 v, float a) {
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, s, -s, c);
	return m * v;
}

void main() {
    // now because of the varying vTexCoord, we can access the current texture coordinate
    vec2 uv = vTexCoord;
    uv.y = 1.-uv.y;
    uv = rotate(uv*screenSize,-angle);

    float mouseDistance = length(vTexCoord)/1.5+distOffset;

    vec2 modUV = mod((uv+offset)*30.,1.);

    float stepUV = step(length(modUV*2.-1.),(1.-mouseDistance)*3.);

    gl_FragColor = mix(vec4(0.,0.,0.,0.),uMaterialColor,stepUV);
}