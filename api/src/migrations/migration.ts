class Migration {
  exec: any;
  migrate: any;

  version: number;
  description: string;

  constructor(version: number, description: string) {
    this.version = version;
    this.description = description;
  }
}

export default Migration;
