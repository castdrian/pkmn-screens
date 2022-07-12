import { createWriteStream } from 'fs';
import { writeFile } from 'fs/promises';
import GIFEncoder from 'gifencoder';
import { tmpdir } from 'os';
import { Canvas, loadImage, type Image } from 'skia-canvas';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import gifFrames from 'gif-frames';
// eslint-disable-next-line import/no-named-default
import { default as ProgressBar } from 'progress';

export async function generateGIF(
  buffer: Buffer,
  url: string,
  sprite: Image,
  x: number,
  y: number,
): Promise<Buffer> {
  const filename = `${tmpdir()}/${Math.random().toString()}_n.png`;
  await writeFile(filename, buffer);
  const gif = await gifFrames({ url, frames: 'all', outputType: 'png' });

  console.log('Extracting frames...');
  const images = await Promise.all(
    gif.map((img: any, index: number) => {
      const file = filename.replace('_n', `_${index}`);
      const stream = createWriteStream(file);
      img.getImage().pipe(stream);
      // eslint-disable-next-line promise/param-names
      return new Promise<string>((res) => stream.on('finish', () => res(file)));
    }),
  );

  console.log('Generating GIF...');

  const GIF = new GIFEncoder(1200, 675);
  GIF.start();
  GIF.setRepeat(0);

  const bar = new ProgressBar('[:bar] :percent', {
    total: images.length,
    complete: '=',
    incomplete: ' ',
    width: 40,
  });
  for (const image of images) {
    bar.tick();
    const canvas = new Canvas(1200, 675);
    const bg = await loadImage(filename);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(
      await loadImage(image),
      x,
      y,
      sprite.width * 3,
      sprite.height * 3,
    );
    GIF.addFrame(ctx as any);
  }

  return GIF.out.getData();
}
