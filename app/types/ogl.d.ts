declare module 'ogl' {
    export class Renderer {
        constructor(options?: any);
        gl: WebGLRenderingContext | WebGL2RenderingContext;
        setSize(width: number, height: number): void;
        render(options: { scene: any; camera?: any }): void;
        dpr: number;
    }
    export class Program {
        constructor(gl: any, options?: any);
        uniforms: any;
    }
    export class Triangle {
        constructor(gl: any, options?: any);
    }
    export class Mesh {
        constructor(gl: any, options?: any);
        position: any;
        rotation: any;
        scale: any;
    }
    export class Vec2 extends Array<number> {
        constructor(x?: number, y?: number);
        x: number;
        y: number;
        set(x: number, y: number): this;
    }
    export class Vec3 extends Array<number> {
        constructor(x?: number, y?: number, z?: number);
        x: number;
        y: number;
        z: number;
        set(x: number, y: number, z: number): this;
    }
}
