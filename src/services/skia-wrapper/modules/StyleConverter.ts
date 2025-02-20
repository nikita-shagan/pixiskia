import * as SKIA from "skia";
import * as PIXI from "pixi.js-legacy";
import { ColorConverter } from "./ColorConverter";

/**
 * Class for converting PIXI styles to Skia.Paint.
 */
export class StyleConverter {
  /**
   * Class for converting PIXI.FillStyle to SKIA.Paint.
   * @param canvasKit skia wasm canvas kit
   * @param fillStyle PIXI.FillStyle object to convert
   * @return SKIA.Paint object
   */
  public static convertFillStyle(
    canvasKit: SKIA.CanvasKit,
    fillStyle: PIXI.FillStyle,
  ): SKIA.Paint {
    const paint = new canvasKit.Paint();
    paint.setAntiAlias(true);
    paint.setColor(
      ColorConverter.convertColor(canvasKit, fillStyle.color, fillStyle.alpha),
    );
    paint.setStyle(canvasKit.PaintStyle.Fill);
    if (!fillStyle.visible) {
      paint.setAlphaf(0);
    }
    return paint;
  }

  /**
   * Class for converting PIXI.LineStyle to SKIA.Paint.
   * @param canvasKit skia wasm canvas kit
   * @param lineStyle PIXI.LineStyle object to convert
   * @return SKIA.Paint object
   */
  public static convertLineStyle(
    canvasKit: SKIA.CanvasKit,
    lineStyle: PIXI.LineStyle,
  ): SKIA.Paint {
    const paint = new canvasKit.Paint();
    paint.setAntiAlias(true);
    paint.setStyle(canvasKit.PaintStyle.Stroke);
    paint.setStrokeWidth(lineStyle.width);
    paint.setColor(
      ColorConverter.convertColor(canvasKit, lineStyle.color, lineStyle.alpha),
    );
    const joinMap = {
      miter: canvasKit.StrokeJoin.Miter,
      bevel: canvasKit.StrokeJoin.Bevel,
      round: canvasKit.StrokeJoin.Round,
    };
    paint.setStrokeJoin(joinMap[lineStyle.join] || canvasKit.StrokeJoin.Miter);
    const capMap = {
      butt: canvasKit.StrokeCap.Butt,
      round: canvasKit.StrokeCap.Round,
      square: canvasKit.StrokeCap.Square,
    };
    paint.setStrokeCap(capMap[lineStyle.cap] || canvasKit.StrokeCap.Butt);
    paint.setStrokeMiter(lineStyle.miterLimit);
    if (!lineStyle.visible) {
      paint.setAlphaf(0);
    }
    return paint;
  }
}
