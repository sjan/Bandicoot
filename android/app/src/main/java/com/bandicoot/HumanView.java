package com.bandicoot;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;
import java.util.ArrayList;
import java.util.List;

public class HumanView extends View {
    private static final String HUMAN_SHAPE =
        "M 302.94495,560.90551 298.44495,600.40551 292.44495,607.30551 "
            + "281.94495,717.90551 272.54495,878.50551 275.74495,943.10551 H 230.34495 "
            + "L 248.34495,888.30551 241.54495,734.30551 233.34495,607.50551 221.94495,599.90551 "
            + "234.74495,489.70551 240.54495,483.40551 241.54495,417.80551 236.34495,355.80551 "
            + "211.54495,413.70551 189.74495,522.20551 197.84495,572.30551 186.34495,585.80551 "
            + "169.94495,582.60551 161.14495,493.60551 203.04495,294.80551 234.54495,256.60551 "
            + "276.04495,235.70551 279.74495,214.70551 254.14495,195.40551 252.74495,108.40551 "
            + "293.44495,80.305508 H 317.94495 L 358.64495,108.60551 357.24495,195.60551 "
            + "331.64495,214.90551 335.34495,235.90551 376.84495,256.80551 408.34495,295.00551 "
            + "450.24495,493.80551 441.44495,582.80551 425.04495,586.00551 413.54495,572.50551 "
            + "421.64495,522.40551 399.84495,413.90551 375.04495,356.00551 369.84495,418.00551 "
            + "370.84495,483.60551 376.64495,489.90551 389.44495,600.10551 378.04495,607.70551 "
            + "369.84495,734.50551 363.04495,888.50551 381.04495,943.30551 H 335.64495 "
            + "L 338.84495,878.70551 329.44495,718.10551 318.94495,607.50551 312.94495,600.60551 "
            + "308.44495,561.10551 Z";
    private static final int RIGHT_WAIST_INDEX = 42;
    private static final int RIGHT_HIP_INDEX = 43;
    private static final int RIGHT_CHEST_INDEX = 33;
    private static final int RIGHT_CHEST_UPPER = 41;

    private static final int LEFT_WAIST_INDEX = 13;
    private static final int LEFT_HIP_INDEX = 11;
    private static final int LEFT_CHEST_INDEX = 14;
    private static final int LEFT_CHEST_UPPER = 22;

    float minXPoint = 161;
    float maxXPoint = 289;
    float minYPoint = 80;
    float maxYPoint = 863;

    private static final String TAG = HumanView.class.getSimpleName();

    private List<Point> list;
    private int waistVectorWidth = 0;
    private int hipVectorWidth = 0;
    private int heightVector = 0;

    private int chestVectorWidth;

    private float CONVERSION_FACTOR = 2.8f;

    public HumanView(Context context) {
        this(context, null);
    }

    public HumanView(Context context,
        @Nullable AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public HumanView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    private void init() {
        list = parse(HUMAN_SHAPE);
    }

    private List<Point> parse(String shape) {
        Log.d(TAG, "parse");

        List<Point> list = new ArrayList<>();
        String tokens[] = shape.split(" ");
        String command = null;
        Float lastY = 0f;
        for (String s : tokens) {
            if (s.matches("[A-Z]")) {
                Log.d(TAG, "cap letter " + s);
                command = s;
            }

            if (s.matches("[0-9.]+,[0-9.]+")) {
                if (command != null && (command.equals("L") || command.equals("M"))) {
                    String[] coordinate = s.split(",");
                    String x = coordinate[0];
                    Float doubleX = Float.parseFloat(x);
                    String y = coordinate[1];

                    Float doubleY = Float.parseFloat(y)-80f;
                    lastY = doubleY;
                    Log.d(TAG, "coordinates " + doubleX + " " + doubleY);
                    list.add(new Point(doubleX, doubleY));
                }
            } else if (s.matches("[0-9.]+")) {
                if (command != null && command.equals("H")) {
                    Float doubleX = Float.parseFloat(s);
                    Log.d(TAG, "coordinates " + doubleX + " " + lastY);
                    list.add(new Point(doubleX, lastY));
                }
            }
        }
        return list;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        Paint paint = new Paint();
        paint.setColor(Color.BLACK);
        canvas.drawPath(drawHuman(canvas.getWidth(), canvas.getHeight()), paint);
    }

    public class Point {
        float x;
        float y;

        Point(Float x, Float y) {
            this.x = x;
            this.y = y;
        }
    }

    private Path drawHuman(int width, int height) {
        Log.d(TAG, "Canvas h:" + height + " w:" + width);
        Log.d(TAG, "Measured h:" + this.getMeasuredHeight() + " w:" + this.getMeasuredWidth());

        Path newpath = new Path();
        if(!newpath.isEmpty()) {
            newpath.rewind();
        }

        float imageWidthX = maxXPoint - minXPoint;
        float imageHeightY = maxYPoint - minYPoint;

        float offsetX = width/2- minXPoint -(imageWidthX);
        float offsetY = -minYPoint +height/2-imageHeightY/2;

        for (int i=0;i<list.size();i++) {
            Point p = list.get(i);
            Float x = (p.x + offsetX);
            Float y = (p.y + offsetY) * scaleFactor(heightVector);

            if (newpath.isEmpty()) {
                newpath.moveTo(x, y);
            } else {
                if(i>= LEFT_CHEST_INDEX && i <= LEFT_CHEST_UPPER) {
                    x = x - computeChestDelta(chestVectorWidth);
                } else if(i>= RIGHT_CHEST_INDEX && i <= RIGHT_CHEST_UPPER) {
                    x = x + computeChestDelta(chestVectorWidth);
                }

                //waist
                if(i == LEFT_WAIST_INDEX) {
                    x = x - computeWaistDelta(waistVectorWidth);
                } else if(i == RIGHT_WAIST_INDEX) {
                    x = x + computeWaistDelta(waistVectorWidth);
                }

                //hip
                if(i>= LEFT_HIP_INDEX && i <= LEFT_HIP_INDEX +1) {
                    x = x - computeHipDelta(hipVectorWidth);
                } else if(i>= RIGHT_HIP_INDEX && i <= RIGHT_HIP_INDEX +1) {
                    x = x + computeHipDelta(hipVectorWidth);
                }

                newpath.lineTo(x, y);
            }
        }

        newpath.close();
        return newpath;
    }

    private float scaleFactor(int heightVector) {
        Log.d(TAG, "height " + Float.valueOf(heightVector/783f));
        return Float.valueOf(heightVector/783f);
    }

    private Float computeChestDelta(int chestWidth) {
        return Float.valueOf(chestWidth/2)-70;
    }

    private Float computeHipDelta(int hipSize) {
        return Float.valueOf(hipSize/2)-68;
    }

    private Float computeWaistDelta(int waistSize) {
        Float f = Float.valueOf(waistSize/2)-64;
        return f;
    }

    public  void waistWidthCM(int value) {
        this.waistVectorWidth = computeVectorDistance(value);
        this.invalidate();
    }

    public void hipWidthCM(int value) {
        this.hipVectorWidth = computeVectorDistance(value);
        this.invalidate();
    }

    public void chestWidthCM(int cmValue) {
        this.chestVectorWidth = computeVectorDistance(cmValue);
        this.invalidate();
    }

    private int computeVectorDistance(int centimeterValue) {
        Log.d(TAG, centimeterValue + " converted into " + centimeterValue*CONVERSION_FACTOR);
        return Math.round(centimeterValue*CONVERSION_FACTOR);
    }

    public void heightCM(int centimeterValue) {
        this.heightVector = computeVectorDistance(centimeterValue);
        this.invalidate();
    }
}
