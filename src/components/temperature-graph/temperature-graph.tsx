import React from 'react';
import {
  Dot,
  DotProps,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';

import { WeatherResponse } from '../../api/types/weather';
import { ConditionTheme } from '../condition-panel/condition-theme';
import {
  graphHeight,
  GraphArea,
  GraphGradientOverlay,
  Labels,
  TimeOfDay,
  Degree
} from './style';

type TemperatureGraphProps = {
  conditionTheme: ConditionTheme;
  weather?: WeatherResponse;
};

const sampleLength = 6;

type TempPayload = {
  date: number;
  temp: number;
  color: string;
  dotStroke: string;
};

interface CustomDotProps extends DotProps {
  index?: number;
  payload?: TempPayload;
}

const CustomDot = ({ index, payload, ...props }: CustomDotProps) => {
  if (index === 0 || index === sampleLength - 1) {
    return null;
  }

  const dotProps = props as DotProps;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Dot {...dotProps} r={4} strokeWidth={2} stroke={payload.dotStroke} />;
};

const TemperatureGraph = ({
  conditionTheme,
  weather
}: TemperatureGraphProps) => {
  if (!weather) {
    return <GraphArea />;
  }

  const { hours } = weather.days[0];
  const sample = [
    hours[5],
    hours[8],
    hours[11],
    hours[14],
    hours[17],
    hours[20]
  ];

  const data: TempPayload[] = sample.map(hour => ({
    date: hour.datetimeEpoch,
    temp: hour.temp,
    color: conditionTheme.color,
    dotStroke: conditionTheme.dotStroke
  }));

  const { overlayBackgroundColor, overlayBackgroundColorRgb } = conditionTheme;
  const [r, g, b] = overlayBackgroundColorRgb;
  const gradientBackground = `linear-gradient(to right, rgba(${r},${g},${b},1) 0%,rgba(${r},${g},${b},0) 12%,rgba(${r},${g},${b},0) 88%,rgba(${r},${g},${b},1) 100%)`;

  return (
    <GraphArea style={{ backgroundColor: overlayBackgroundColor }}>
      <h6>Temperature</h6>
      <ResponsiveContainer width="100%" height={graphHeight}>
        <LineChart width={300} height={graphHeight} data={data}>
          <ReferenceLine x={data[1].date} stroke="rgba(255, 255, 255, 0.2)" />
          <ReferenceLine x={data[2].date} stroke="rgba(255, 255, 255, 0.2)" />
          <ReferenceLine x={data[3].date} stroke="rgba(255, 255, 255, 0.2)" />
          <ReferenceLine x={data[4].date} stroke="rgba(255, 255, 255, 0.2)" />
          <XAxis
            dataKey="date"
            type="number"
            interval={0}
            domain={[data[1].date - 5000, data[4].date + 5000]}
            xAxisId={0}
            allowDataOverflow
            hide
          />
          <YAxis domain={['auto', 'auto']} hide />
          <Line
            type="monotoneX"
            dataKey="temp"
            stroke={conditionTheme.color}
            dot={<CustomDot />}
          />
        </LineChart>
      </ResponsiveContainer>
      <GraphGradientOverlay style={{ background: gradientBackground }} />
      <Labels>
        <div>
          <TimeOfDay>Morning</TimeOfDay>
          <h3>
            {Math.round(sample[1].temp)}
            <Degree>°</Degree>
          </h3>
        </div>
        <div>
          <TimeOfDay>Afternoon</TimeOfDay>
          <h3>
            {Math.round(sample[2].temp)}
            <Degree>°</Degree>
          </h3>
        </div>
        <div>
          <TimeOfDay>Evening</TimeOfDay>
          <h3>
            {Math.round(sample[3].temp)}
            <Degree>°</Degree>
          </h3>
        </div>
        <div>
          <TimeOfDay>Night</TimeOfDay>
          <h3>
            {Math.round(sample[4].temp)}
            <Degree>°</Degree>
          </h3>
        </div>
      </Labels>
    </GraphArea>
  );
};

export default TemperatureGraph;
