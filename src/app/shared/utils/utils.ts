interface CsvRow {
    [key: string]: string;
}

export const csvAJson = (csv: string): string => {
    if (!csv.trim()) {
        return JSON.stringify([]);
    }

    const lineas = csv.split('\n').filter(line => line.trim() !== '');
    const result: CsvRow[] = [];

    const headers = lineas[0].split(',').map(header => header.trim());

    for (let i = 1; i < lineas.length; i++) {
        const objeto: CsvRow = {};
        const lineaActual = lineas[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            objeto[headers[j]] = (lineaActual[j] || '').trim();
        }

        result.push(objeto);
    }

    return JSON.stringify(result);
};