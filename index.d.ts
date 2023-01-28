declare function spawn(cmd: string, args: string[], opts: { [x: string]: unknown }): Promise<string>;
export = spawn;
