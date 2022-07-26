import React from 'react';
import {
  Dot,
  DotProps,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  ReferenceLine
} from 'recharts';

import { WeatherResponse } from '../../api/types/weather';
import { ConditionTheme } from '../condition-panel/condition-theme';
import { GraphArea, GraphGradientOverlay, Labels } from './style';

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

  const data: TempPayload[] = sample.map((hour, index) => ({
    date: hour.datetimeEpoch,
    temp: hour.temp,
    color: conditionTheme.color,
    dotStroke: conditionTheme.dotStroke
  }));

  const [r, g, b] = conditionTheme.overlayBackgroundColorRgb;
  const gradientBackground = `linear-gradient(to right, rgba(${r},${g},${b},1) 0%,rgba(${r},${g},${b},0) 12%,rgba(${r},${g},${b},0) 88%,rgba(${r},${g},${b},1) 100%)`;

  return (
    <GraphArea
      style={{ backgroundColor: conditionTheme.overlayBackgroundColor }}
    >
      <h6>Temperature</h6>
      <ResponsiveContainer width="100%" height={150}>
        <LineChart width={300} height={150} data={data}>
          <ReferenceLine x={data[1].date} stroke="rgba(255, 255, 255, 0.1)" />
          <ReferenceLine x={data[2].date} stroke="rgba(255, 255, 255, 0.1)" />
          <ReferenceLine x={data[3].date} stroke="rgba(255, 255, 255, 0.1)" />
          <ReferenceLine x={data[4].date} stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis
            dataKey="date"
            type="number"
            interval={0}
            domain={[data[1].date - 5000, data[4].date + 5000]}
            xAxisId={0}
            allowDataOverflow
            hide
          />
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
          Morning
          <h3>{Math.round(sample[1].temp)}</h3>
        </div>
        <div>
          Afternoon
          <h3>{Math.round(sample[2].temp)}</h3>
        </div>
        <div>
          Evening
          <h3>{Math.round(sample[3].temp)}</h3>
        </div>
        <div>
          Night
          <h3>{Math.round(sample[4].temp)}</h3>
        </div>
      </Labels>
    </GraphArea>
  );
};

export default TemperatureGraph;
