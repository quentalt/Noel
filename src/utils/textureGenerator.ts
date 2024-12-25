export function generateSnowTexture(): Float32Array {
    const size = 128;
    const data = new Float32Array(size * size * 4);

    for (let i = 0; i < size * size; i++) {
        const stride = i * 4;

        // Base blanche avec plus de variation
        const baseValue = 0.92 + Math.random() * 0.08;

        // Motif de cristaux de neige
        const x = i % size;
        const y = Math.floor(i / size);
        const pattern = Math.sin(x * 0.2) * Math.cos(y * 0.2) * 0.05;

        // Variation pour l'effet de neige
        const noise = Math.random() * 0.15;
        const sparkle = Math.random() > 0.98 ? Math.random() * 0.4 : 0;

        const finalValue = baseValue + pattern + noise + sparkle;

        data[stride] = finalValue;     // R
        data[stride + 1] = finalValue; // G
        data[stride + 2] = finalValue; // B
        data[stride + 3] = 1;         // A
    }

    return data;
}