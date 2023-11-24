import React, { FC } from "react";
import { Card, Text, Metric } from "@tremor/react";

interface CardProps {
  title: string;
  value: string;
}

const TremorCard: React.FC<CardProps> = (props) => (
  <Card className="mx-auto max-w-xs">
    <Text>{props.title}</Text>
    <Metric>{props.value}</Metric>
  </Card>
);

export default TremorCard;
