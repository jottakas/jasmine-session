const getRandom = (min: number, max: number) =>
  Math.floor(Math.random() * max) + min;
const getItemRandom = (list: any[]) => list[getRandom(0, list.length)];

export const Utils = {
  getRandom,
  getItemRandom,
  getLoremIpsumRandom: () => getItemRandom(LOREM_IPSUMS),
};

const LOREM_IPSUMS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent semper fringilla molestie. Duis vitae mauris quis metus egestas feugiat. Sed auctor tellus sed lacus lobortis, in sollicitudin mi lobortis.',
  'Nullam pharetra turpis vestibulum rutrum maximus. Mauris tempus elit non purus tincidunt, in lacinia leo vestibulum. Nullam urna lectus, mollis vel imperdiet rhoncus, semper vel risus. Nam sollicitudin, est sed semper venenatis, nisi mauris ultricies lorem, at dictum libero diam nec lorem.',
  'Nam sit amet pretium magna. Vivamus ultricies nisl nisl, eget sagittis libero dignissim eu. Mauris facilisis magna vel pretium pulvinar. Pellentesque posuere erat velit. Nam velit massa, venenatis in sem hendrerit, facilisis viverra massa. Suspendisse quis tortor sit amet leo imperdiet ultrices et quis ex. Suspendisse id porttitor dui, sit amet molestie mauris. Donec placerat nunc in vulputate ornare. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
  'Donec tristique nisi id egestas fringilla. Proin in risus massa. Nunc lorem mauris, malesuada in augue id, fermentum dictum erat. Phasellus in tellus massa. Mauris sed arcu et ex ullamcorper faucibus semper a lorem. ',
  'Mauris mollis id lectus id tristique. Aenean eleifend dapibus nibh. Duis elementum augue arcu, non facilisis diam lacinia nec. Donec fermentum erat sit amet ligula maximus tincidunt. Maecenas sollicitudin efficitur nibh, ac maximus ligula. Etiam lectus ex, vulputate nec aliquam nec, viverra ac eros.',
  'Fusce commodo massa quis enim ornare ultricies. Phasellus venenatis eros augue, eget fermentum ex egestas sit amet.',
  'Curabitur sagittis posuere massa, non pretium turpis eleifend et. Mauris tempor nunc eget dictum sagittis. Quisque sollicitudin nisl quam. Nunc enim nunc, imperdiet at orci lobortis, iaculis tempus sapien. ',
  'Praesent accumsan enim a mauris facilisis dignissim. Aenean vitae neque sit amet orci sodales dignissim. Nulla finibus sit amet nunc sit amet ultrices. Proin vel sodales ex. Vestibulum consequat ante vitae cursus tincidunt. Nam ac enim mollis, aliquet arcu nec, blandit sapien.',
  'Aenean vulputate purus sit amet magna laoreet, sit amet scelerisque tortor pulvinar.',
  'Nullam convallis, lacus quis mattis placerat, metus turpis suscipit leo, vel euismod ligula nulla sit amet neque. Pellentesque at ligula neque. Aliquam semper vitae quam sit amet vulputate. Ut varius vitae ligula sit amet facilisis. ',
  'Nunc aliquet, massa at scelerisque sagittis, urna magna porta diam, eget bibendum risus nibh a justo. Mauris feugiat non velit et lacinia. Praesent dignissim consequat placerat. Aenean tempor ligula ac neque convallis porttitor. Sed lorem metus, varius in bibendum ut, vestibulum ac lacus.',
  'Sed ut sollicitudin nisi. Cras placerat enim eu lobortis dictum. Fusce semper turpis justo, non cursus dui tristique euismod. In hac habitasse platea dictumst.',
  'Aenean semper, massa ac aliquet placerat, tortor diam vehicula enim, vel auctor magna erat mattis felis. Mauris et quam vehicula, posuere urna sed, fringilla leo. ',
  'Praesent pretium, dui sed iaculis bibendum, augue ante pharetra purus, sit amet hendrerit risus metus in est. Nulla nisi tortor, ultrices ac nisl id, rhoncus dapibus neque. Maecenas aliquam eleifend fringilla. Donec augue arcu, volutpat a pharetra sed, consequat ac lacus.',
  'Nullam tempus eget mauris vel vulputate. Suspendisse vel lacus bibendum, gravida quam eu, iaculis sem. In sit amet orci sit amet est laoreet fermentum. Etiam ligula elit, efficitur ut lectus at, consequat fringilla libero. Maecenas viverra, erat nec venenatis maximus, risus felis efficitur ipsum, mollis rhoncus nisl eros eget odio.',
];
