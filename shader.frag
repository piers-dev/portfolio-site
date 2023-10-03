precision mediump float;

varying vec2 vTexCoord;

uniform vec2 screenSize;
uniform vec2 mousePos;
uniform vec2 offset;

void main() {
    // now because of the varying vTexCoord, we can access the current texture coordinate
    vec2 uv = vTexCoord*screenSize;

    float mouseDistance = length(vTexCoord);

    vec2 modUV = mod((uv+offset)*10.,1.);

    float stepUV = step(length(modUV*2.-1.),(1.-mouseDistance)*2.);

    gl_FragColor = vec4(stepUV,0.,0.,1.);
}