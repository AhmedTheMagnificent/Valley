varying float vElevation;
uniform sampler2D uTexture;
uniform float uTextureofFrequency;

void main(){
    //float elevation = vElevation + 0.5;
    //float alpha = mod(vElevation * 10.0, 1.0);
    //alpha = step(0.95, alpha);
    vec4 textureColor = texture2D(uTexture, vec2(0.0, vElevation * uTextureofFrequency));
    gl_FragColor = textureColor;
}