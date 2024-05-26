import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

import { Title } from '@/components/title';
import { Button } from '@/ui';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

interface SelectProps {
  label: string;
  options: Option[];
  value?: string;
  onSelect: (option: Option) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, value, onSelect }) => {
  return (
    <View>
      <Text>{label}</Text>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => {
          const selectedOption = options.find(
            (option) => option.value === itemValue
          );
          if (selectedOption) {
            onSelect(selectedOption);
          }
        }}
      >
        {options.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  );
};

interface ChartComponentProps {
  valuePrimario?: string;
  valueSecundario?: string;
  valueTerciario?: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  valuePrimario,
  valueSecundario,
  valueTerciario,
}) => {
  const data = [
    {
      name: 'Chocolate',
      population: valuePrimario ? 1 : 0,
      color: '#600080',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Strawberry',
      population: valueSecundario ? 1 : 0,
      color: '#9900cc',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Vanilla',
      population: valueTerciario ? 1 : 0,
      color: '#c61aff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ].filter((item) => item.population > 0);

  return (
    <View style={styles.chartContainer}>
      <PieChart
        data={data}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

const FilterComponent: React.FC = () => {
  const [valuePrimario, setValuePrimario] = useState<string | undefined>();
  const [valueSecundario, setValueSecundario] = useState<string | undefined>();
  const [valueTerciario, setValueTerciario] = useState<string | undefined>();
  const [showChart, setShowChart] = useState<boolean>(false);

  const handleSubmit = () => {
    setShowChart(true);
  };

  return (
    <View style={styles.container}>
      <Title text="Form" />
      <Select
        label="Filtro Primario"
        options={options}
        value={valuePrimario}
        onSelect={(option: Option) => setValuePrimario(option.value)}
      />
      <Select
        label="Filtro Secundario"
        options={options}
        value={valueSecundario}
        onSelect={(option: Option) => setValueSecundario(option.value)}
      />
      <Select
        label="Filtro Terciario"
        options={options}
        value={valueTerciario}
        onSelect={(option: Option) => setValueTerciario(option.value)}
      />
      <Button label="ENVIAR" onPress={handleSubmit} />
      {showChart && (
        <ChartComponent
          valuePrimario={valuePrimario}
          valueSecundario={valueSecundario}
          valueTerciario={valueTerciario}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  chartContainer: {
    marginTop: 20,
  },
  pieChart: {
    height: 200,
  },
});

export default FilterComponent;
