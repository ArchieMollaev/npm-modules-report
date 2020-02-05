interface IPackage {
  name: string;
  version: string;
  dependencies?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
}

export default function generateReport(
  packageObj: IPackage,
  columns?: string[]
): Promise<Array<string[]>>;
