import {
  Card,
  Col,
  DeltaType,
  DeltaBar,
  DonutChart,
  Select,
  SelectItem,
  Flex,
  List,
  ListItem,
  Text,
  Title,
  Bold,
  Grid,
  Color,
} from "@tremor/react";
import { useEffect, useState } from "react";

const industries = [
  { key: "all", name: "All industries" },
  { key: "tech", name: "Tech" },
  { key: "health", name: "Health" },
  { key: "manufacturing", name: "Manufacturing" },
];

interface AssetData {
  name: string;
  industry: string;
  sales: number;
  delta: number;
  deltaType: DeltaType;
  status: Color;
}

const cities: AssetData[] = [
  {
    name: "Off Running Inc.",
    industry: "tech",
    sales: 984888,
    delta: 61.3,
    deltaType: "increase",
    status: "emerald",
  },
  {
    name: "Black Swan Holding",
    industry: "health",
    sales: 456700,
    delta: 32.8,
    deltaType: "moderateDecrease",
    status: "emerald",
  },
  {
    name: "Blingtech Inc.",
    industry: "Tech",
    sales: 390800,
    delta: -18.3,
    deltaType: "moderateDecrease",
    status: "rose",
  },
  {
    name: "Cortina Steal AG",
    industry: "manufacturing",
    sales: 240000,
    delta: 19.4,
    deltaType: "moderateIncrease",
    status: "emerald",
  },
  {
    name: "Rain Drop Holding",
    industry: "health",
    sales: 190800,
    delta: -19.4,
    deltaType: "moderateIncrease",
    status: "rose",
  },
  {
    name: "Pas Crazy Inc.",
    industry: "tech",
    sales: 164400,
    delta: -32.8,
    deltaType: "decrease",
    status: "rose",
  },
  {
    name: "Hype Room Inc.",
    industry: "manufacturing",
    sales: 139800,
    delta: -40.1,
    deltaType: "moderateIncrease",
    status: "rose",
  },
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()} $`;

const filterByindustry = (industry: string, data: AssetData[]) =>
  industry === "all" ? data : data.filter((city) => city.industry === industry);

export default function Assets() {
  const [selectedindustry, setSelectedindustry] = useState("all");
  const [filteredData, setFilteredData] = useState(cities);

  useEffect(() => {
    const data = cities;
    setFilteredData(filterByindustry(selectedindustry, data));
  }, [selectedindustry]);

  return (
    <Card className="max-w-4xl mx-auto">
      <div className="hidden sm:block">
        <Flex className="space-x-4" justifyContent="start" alignItems="center">
          <Title className="truncate">Asset Performance</Title>
          <Select
            onValueChange={setSelectedindustry}
            placeholder="Industry Selection"
            className="max-w-xs"
          >
            {industries.map((industry) => (
              <SelectItem key={industry.key} value={industry.key}>
                {industry.name}
              </SelectItem>
            ))}
          </Select>
        </Flex>
      </div>
      {/* --- Same code snippet as above but with no flex to optmize mobile view --- */}
      <div className="sm:hidden">
        <Title className="truncate">Asset Performance</Title>
        <Select
          onValueChange={setSelectedindustry}
          placeholder="Industry Selection"
          className="max-w-full mt-2"
        >
          {industries.map((industry) => (
            <SelectItem key={industry.key} value={industry.key}>
              {industry.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Grid numItemsLg={3} className="mt-8 gap-y-10 gap-x-14">
        <Flex>
          <DonutChart
            data={filteredData}
            category="sales"
            index="name"
            variant="donut"
            valueFormatter={valueFormatter}
            className="h-52"
          />
        </Flex>
        <Col numColSpan={1} numColSpanLg={2}>
          <Flex>
            <Text className="truncate">
              <Bold>Asset</Bold>
            </Text>
            <Text>
              <Bold>+/-% since transaction </Bold>
            </Text>
          </Flex>
          <div className="hidden sm:block">
            <List className="mt-2">
              {filteredData.map((city) => (
                <ListItem key={city.name}>
                  <Text className="truncate">{city.name}</Text>
                  <div>
                    <Flex justifyContent="end" className="space-x-4">
                      <Text color={city.status} className="truncate">
                        {Intl.NumberFormat("us", {
                          signDisplay: "exceptZero",
                        })
                          .format(city.delta)
                          .toString()}
                        &#37;
                      </Text>
                      <div className="w-44">
                        <DeltaBar
                          value={city.delta}
                          isIncreasePositive={true}
                          tooltip=""
                          showAnimation={true}
                        />
                      </div>
                    </Flex>
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
          {/* --- Same code snippet as above but with less width for data bars to optimize mobile --- */}
          <div className="sm:hidden">
            <List className="mt-2">
              {filteredData.map((city) => (
                <ListItem key={city.name}>
                  <Text className="truncate">{city.name}</Text>
                  <div>
                    <Flex justifyContent="end" className="space-x-4">
                      <Text color={city.status} className="truncate">
                        {city.delta}%{" "}
                      </Text>
                      <div className="w-20">
                        <DeltaBar
                          value={city.delta}
                          isIncreasePositive={true}
                          tooltip=""
                          showAnimation={true}
                        />
                      </div>
                    </Flex>
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
        </Col>
      </Grid>
    </Card>
  );
}
