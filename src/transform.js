export default function transform(input, options) {
  const lines = input
    .split('\n')
    .filter(Boolean)
    .map(s => s.replace(/ major from/i, ',').replace(/\([0-9]+\)/, ''));
  const out = Object.create(null);
  let outputString = '';
  for (let line of lines) {
    let [name, major, city] = line.split(',');
    name = name.trim();
    let altCity = options
      .replace
      .value
      .filter(v => v.for === name)
      .reduce((a,c) => c.city, '');
    city = altCity || city.trim();
    major = options.lowerCaseMajor.value ?
      major.trim().toLowerCase() :
      major.trim();

    if (!out[city]) {
      out[city] = [{ name, major }];
      continue;
    }

    out[city].push({ name, major });
  }

  for (let city of Object.keys(out).sort(byImportance)) {
    outputString += `\n${city}\n`;
    out[city].map((recip, i, a) => {
      let sep = ' ; ';
      if (i === a.length - 1) { sep = '.'; }
      outputString += `${recip.name}, ${recip.major}${sep}`;
    });
    outputString += '\n';
  }

  function byImportance(a, b) {
    const order = options
      .citiesOrderOfImportance
      .value.map(s => new RegExp(s, 'i'));

    function o(s) {
      return order.findIndex(re => re.test(s));
    }

    if (o(a) > -1 && o(a) < o(b)) {
      return -1;
    } else if (o(a) > o(b)) {
      return 1;
    } else {
      return 0;
    }
  }

  return outputString;
}
