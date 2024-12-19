interface IFamily {
  id: string;
  label: string;
  partnershipsIDs: string[] | null;
}

export default [
  {
    id: '001',
    label: 'Отец',
    partnershipsIDs: [
      'ship_000001', 
      'ship_000002'
    ]
  },
  {
    id: '002',
    label: 'Мать',
    partnershipsIDs: [
      'ship_000001'
    ]
  },
  {
    id: '002_1',
    label: 'Мать 2',
    partnershipsIDs: [
      'ship_000002'
    ]
  },
  {
    id: '003',
    label: 'Сын',
    partnershipsIDs: null,
  },
  {
    id: '004',
    label: 'Дочь',
    partnershipsIDs: [
      'ship_000005'
    ]
  },
  {
    id: '005',
    label: 'Дед по отцу',
    partnershipsIDs: [
      'ship_000003'
    ]
  },
  {
    id: '006',
    label: 'Бабушка по отцу',
    partnershipsIDs: [
      'ship_000003'
    ]
  },
 
  {
    id: '007',
    label: 'Дед по матери',
    partnershipsIDs: [
      'ship_000004'
    ]
  },
  {
    id: '008',
    label: 'Бабушка по матери',
    partnershipsIDs: [
      'ship_000004'
    ]
  },
  {
    id: '009',
    label: 'Сын дочери',
    partnershipsIDs: null
  },
  {
    id: '010',
    label: 'Брат Деда по матери',
    partnershipsIDs: null
  },
  {
    id: '011',
    label: 'Брат2 Деда по матери',
    partnershipsIDs: null
  },
  {
    id: '012',
    label: 'Прадед Дедов по матери',
    partnershipsIDs: [
      'ship_000006'
    ]
  }
] as IFamily[]