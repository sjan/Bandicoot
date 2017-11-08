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
import java.util.List;
import java.util.Stack;

public class HumanView extends View {
    private static final String HUMAN_SHAPE =
        "M 330.5,423.3439 325.1,462.8439 317.9,469.7439 305.3,600.3439 294.1,760.9439 "
            + "297.9,825.5439 H 243.6 L 265.1,770.7439 250.3,656.7439 247.1,469.9439 "
            + "233.5,454.9439 248.8,359.5439 255.7,345.8439 262.7,270.2439 250.7,214.2439 "
            + "221,296.1439 195,394.6439 204.7,444.7439 190.9,458.2439 171.3,455.0439 "
            + "160.8,366.0439 210.9,142.2439 248.6,112.0439 305.7,96.143902 309.2,76.143902 "
            + "290.3,56.843902 289.1,-9.1560976 319.1,-37.256098 H 348.4 L 378.4,-8.9560976 "
            + "377.2,57.043902 358.3,76.343902 361.8,96.343902 418.9,112.2439 456.6,142.4439 "
            + "506.8,366.2439 496.3,455.2439 476.7,458.4439 462.9,444.9439 472.6,394.8439 "
            + "446.5,296.3439 416.8,214.4439 404.8,270.4439 411.8,346.0439 418.7,359.7439 "
            + "434,455.1439 420.4,470.1439 417.2,656.9439 402.4,770.9439 423.9,825.7439 "
            + "H 369.6 L 373.4,761.1439 362.2,600.5439 349.6,469.9439 342.4,463.0439 "
            + "337,423.5439 Z";

    private static final int RIGHT_HIP_INDEX = 43;
    private static final int RIGHT_WAIST_INDEX = 42;
    private static final int RIGHT_CHEST_UPPER = 41;
    private static final int RIGHT_CHEST_INDEX = 33;

    private static final int LEFT_HIP_INDEX = 11;
    private static final int LEFT_WAIST_INDEX = 13;
    private static final int LEFT_CHEST_INDEX = 14;
    private static final int LEFT_CHEST_UPPER = 22;

    private static final Float CM_HEIGHT = 176f;

    Float X_MIN_POINT = Float.MAX_VALUE;
    Float X_MAX_POINT = Float.MIN_VALUE;
    Float Y_MIN_POINT = Float.MAX_VALUE;
    Float Y_MAX_POINT = Float.MIN_VALUE;
    Float HIP_WIDTH;
    Float WAIST_WIDTH;
    Float CHEST_WIDTH;
    Float X_WIDTH;
    Float Y_HEIGHT;

    private static final String TAG = HumanView.class.getSimpleName();

    private List<Point> pointList;
    private int waistVectorWidth = 0;
    private int hipVectorWidth = 0;
    private int heightVector = 0;

    private int chestVectorWidth;
    private Paint paint = new Paint();

    private float CONVERSION_FACTOR = 0f;

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
        pointList = parse(HUMAN_SHAPE);
    }

    private List<Point> parse(String shape) {
        Log.d(TAG, "parse");

        Stack<Point> pointStack = new Stack<>();
        String tokens[] = shape.split(" ");
        String command = null;
        Float lastY = 0f;
        for (String token : tokens) {
            Float floatX;
            Float floatY;

            if (token.matches("[A-Z]")) {
                command = token;
            }

            if (token.matches("-?[0-9.]+,-?[0-9.]+")) {
                if (command != null && (command.equals("L") || command.equals("M"))) {
                    String[] coordinate = token.split(",");
                    floatX = Float.parseFloat(coordinate[0]);
                    floatY = Float.parseFloat(coordinate[1]);
                    pointStack.add(new Point(floatX, floatY));
                    lastY = floatY;
                }
            } else if (token.matches("-?[0-9.]+")) {
                if (command != null && command.equals("H")) {
                    floatX = Float.parseFloat(token);
                    floatY = lastY;
                    pointStack.add(new Point(floatX, floatY ));
                }
            }

            if(!pointStack.isEmpty()) {
                float currentX = pointStack.peek().x;
                float currentY = pointStack.peek().y;

                X_MIN_POINT = (X_MIN_POINT < currentX) ? X_MIN_POINT : currentX;
                X_MAX_POINT = (X_MAX_POINT > currentX) ? X_MAX_POINT : currentX;
                Y_MIN_POINT = (Y_MIN_POINT < currentY) ? Y_MIN_POINT : currentY;
                Y_MAX_POINT = (Y_MAX_POINT > currentY) ? Y_MAX_POINT : currentY;

                X_WIDTH = X_MAX_POINT - X_MIN_POINT;
                Y_HEIGHT = Y_MAX_POINT - Y_MIN_POINT;
            }
        }

        CONVERSION_FACTOR = Y_HEIGHT/CM_HEIGHT;
        CHEST_WIDTH = (pointStack.get(RIGHT_CHEST_INDEX).x - pointStack.get(LEFT_CHEST_INDEX).x);
        WAIST_WIDTH = (pointStack.get(RIGHT_WAIST_INDEX).x - pointStack.get(LEFT_WAIST_INDEX)
            .x);
        HIP_WIDTH = (pointStack.get(RIGHT_HIP_INDEX).x - pointStack.get(LEFT_HIP_INDEX).x);

        return pointStack;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
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

    private Path drawHuman(int canvasWidth, int canvasHeight) {
        Log.d(TAG, "Canvas h:" + canvasHeight + " w:" + canvasWidth);

        Path newpath = new Path();
        if(!newpath.isEmpty()) {
            newpath.rewind();
        }

        float centerOffsetX = - X_MIN_POINT - X_WIDTH/2;
        float centerOffsetY = - Y_MIN_POINT - Y_HEIGHT/2;

        for (int index=0;index<pointList.size();index++) {
            Point p = pointList.get(index);

            Float x = p.x + centerOffsetX;
            Float y = (p.y + centerOffsetY) * scaleFactor(heightVector);

            if (newpath.isEmpty()) {
                x = x + canvasWidth/2;
                y = y + canvasHeight/2;
                newpath.moveTo(x, y);
            } else {
                if(index>= LEFT_CHEST_INDEX && index <= LEFT_CHEST_UPPER) {
                    x = x - computeChestDelta(chestVectorWidth);
                } else if(index>= RIGHT_CHEST_INDEX && index <= RIGHT_CHEST_UPPER) {
                    x = x + computeChestDelta(chestVectorWidth);
                }

                //waist
                if(index == LEFT_WAIST_INDEX) {
                    x = x - computeWaistDelta(waistVectorWidth);
                } else if(index == RIGHT_WAIST_INDEX) {
                    x = x + computeWaistDelta(waistVectorWidth);
                }

                //hip
                if(index>= LEFT_HIP_INDEX && index <= LEFT_HIP_INDEX +1) {
                    x = x - computeHipDelta(hipVectorWidth);
                } else if(index>= RIGHT_HIP_INDEX && index <= RIGHT_HIP_INDEX +1) {
                    x = x + computeHipDelta(hipVectorWidth);
                }

                x = x + canvasWidth/2;
                y = y + canvasHeight/2;
                newpath.lineTo(x, y);
            }
        }

        newpath.close();
        return newpath;
    }

    private float scaleFactor(int heightVector) {
        return heightVector/Y_HEIGHT;
    }

    private Float computeChestDelta(int chestVectorWidth) {
        return (chestVectorWidth/2)-CHEST_WIDTH/2;
    }

    private Float computeHipDelta(int hipSize) {
        return (hipSize/2)-HIP_WIDTH/2;
    }

    private Float computeWaistDelta(int waistWidth) {
        return (waistWidth/2)-WAIST_WIDTH/2;
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
        return Math.round(centimeterValue*CONVERSION_FACTOR);
    }

    public void heightCM(int centimeterValue) {
        this.heightVector = computeVectorDistance(centimeterValue);
        this.invalidate();
    }
}
