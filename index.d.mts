import { z as z$1 } from 'zod/index';
import { z } from 'zod';

declare class BaseEntity {
    readonly id: string;
    readonly foreignKey: string;
    readonly otherKey: string;
    isBase: boolean;
    isComponent: boolean;
    isDevice: boolean;
    isRoom: boolean;
    isFloor: boolean;
    isBuilding: boolean;
    isDynamic: boolean;
    isMain: boolean;
    constructor(id: string, foreignKey: string, otherKey: string);
}
declare class BuildingEntity extends BaseEntity {
    constructor(id: string, foreignKey: string, otherKey: string);
}
declare class MainEntity extends BaseEntity {
    constructor(id: string, foreignKey: string, otherKey: string);
}

declare enum InjectCycleModeEnum {
    ModelComplete = "ModelComplete",
    BeforeRender = "BeforeRender"
}
declare enum SkyModeEnum {
    None = "None",
    Hdr = "Hdr",
    Auto = "Auto",
    Virtual = "Virtual"
}
declare enum MouseTargetEnum {
    Left = "Left",
    Wheel = "Wheel",
    Right = "Right",
    LeftDB = "LeftDB",
    RightDB = "RightDB"
}
declare enum EntityTargetEnum {
    Main = "Main",
    Building = "Building",
    Floor = "Floor",
    Room = "Room",
    Device = "Device",
    Component = "Component",
    Dynamic = "Dynamic"
}
declare enum ViewModeEnum {
    First = "First",
    Third = "Third"
}

declare const InjectCycleModeSchema: z.ZodEnum<typeof InjectCycleModeEnum>;
declare const MouseTargetSchema: z.ZodEnum<typeof MouseTargetEnum>;
declare const MouseEventOptionSchema: z.ZodObject<{
    once: z.ZodOptional<z.ZodBoolean>;
    accept: z.ZodEnum<typeof EntityTargetEnum>;
    filter: z.ZodOptional<z.ZodCustom<() => boolean, () => boolean>>;
}, z.core.$strip>;
declare const HoverEventOptionSchema: z.ZodObject<{
    once: z.ZodOptional<z.ZodBoolean>;
    accept: z.ZodEnum<typeof EntityTargetEnum>;
    allowEmpty: z.ZodOptional<z.ZodBoolean>;
    filter: z.ZodOptional<z.ZodCustom<() => boolean, () => boolean>>;
}, z.core.$strip>;
declare const KeyBoardEventOptionSchema: z.ZodOptional<z.ZodObject<{
    once: z.ZodOptional<z.ZodBoolean>;
    altKey: z.ZodOptional<z.ZodBoolean>;
    ctrlKey: z.ZodOptional<z.ZodBoolean>;
    shiftKey: z.ZodOptional<z.ZodBoolean>;
    metaKey: z.ZodOptional<z.ZodBoolean>;
    matchCase: z.ZodOptional<z.ZodBoolean>;
    filter: z.ZodOptional<z.ZodCustom<() => boolean, () => boolean>>;
}, z.core.$strip>>;
declare const ViewModeSchema: z.ZodEnum<typeof ViewModeEnum>;
declare const AnimateOptionSchema: z.ZodOptional<z.ZodObject<{
    delay: z.ZodOptional<z.ZodNumber>;
    duration: z.ZodOptional<z.ZodNumber>;
    stagger: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>>;

type NullValue<T> = T | null | undefined;

declare enum MouseEventEnum {
    Left = "Left",
    Wheel = "Wheel",
    Right = "Right",
    LeftDB = "LeftDB",
    RightDB = "RightDB",
    Hover = "Hover"
}

declare class MouseEvent {
    type: MouseEventEnum;
    target: NullValue<BaseEntity>;
    target2: {
        x: number;
        y: number;
    };
    target3: {
        x: NullValue<number>;
        y: NullValue<number>;
        z: NullValue<number>;
    };
    constructor(type: MouseEventEnum, target: BaseEntity, target2: {
        x: number;
        y: number;
        z: number;
    }, target3: {
        x: number;
        y: number;
        z: number;
    });
}
declare class KeyBoardEvent {
    key: string;
    altKey?: boolean;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    metaKey?: boolean;
    constructor(key: string, altKey: boolean, ctrlKey: boolean, shiftKey: boolean, metaKey: boolean);
}

type InjectCycleModeType = z$1.infer<typeof InjectCycleModeSchema>;
type ViewMode = z$1.infer<typeof ViewModeSchema>;
type MouseEventOption = z$1.infer<typeof MouseEventOptionSchema>;
type HoverEventOption = z$1.infer<typeof HoverEventOptionSchema>;
type KeyBoardEventOption = z$1.infer<typeof KeyBoardEventOptionSchema>;
type MouseTarget = z$1.infer<typeof MouseTargetSchema>;
type AnimateOption = z$1.infer<typeof AnimateOptionSchema>;

declare class AnimateManager {
    #private;
    constructor();
    explodeBuilding(building: BuildingEntity, gap?: number, option?: AnimateOption): void;
    closeBuilding(building: BuildingEntity, option?: AnimateOption): void;
    selfShow(entity: BaseEntity, option?: AnimateOption): void;
    dispose(): void;
}

declare class ActiveStateManager {
    #private;
    constructor(animateManager: AnimateManager);
    setActive(entity: BaseEntity): void;
    backMain(): void;
    back(): void;
    dispose(): void;
}

declare class WindowManager {
    #private;
    hasWindowsMaps: Map<string, string>;
    constructor();
    addWindowByEntity(entity: BaseEntity, title: string, content?: string): void;
    removeWindowByEntity(entity: BaseEntity): void;
    dispose(): void;
}

declare class HitManager {
    #private;
    currentHover: NullValue<BaseEntity>;
    constructor();
    toggleHit(entity: BaseEntity): void;
    cancelAllHit(): void;
    toggleWarning(entity: BaseEntity): void;
    cancelAllWarning(): void;
    toggleHoverHit(entity: NullValue<BaseEntity>, color?: string): void;
    clearHoverHit(): void;
    dispose(): void;
}

declare class EventManager {
    #private;
    constructor();
    onMouse(type: MouseTarget, callback: (event?: MouseEvent) => void, option: MouseEventOption): void;
    onHover(callback: (event?: MouseEvent) => void, option: HoverEventOption): void;
    onKeyBoard(key: string, callback: (event?: KeyBoardEvent) => void, option?: KeyBoardEventOption): void;
    offEvent(mouseEventId: string): void;
    dispose(): void;
}

declare class ModelManager {
    constructor();
    loadModel(buffer: ArrayBuffer, fileType: '.glb' | '.gltf'): void;
    dispose(): void;
}

declare class CameraManager {
    constructor();
    toggleViewMode(mode: ViewMode): void;
    lookAtEntity(entity: BaseEntity): void;
    dispose(): void;
}

declare const InitOptionSchema: z.ZodObject<{
    offLoading: z.ZodOptional<z.ZodBoolean>;
    skyMode: z.ZodOptional<z.ZodEnum<typeof SkyModeEnum>>;
    baseUrl: z.ZodString;
    showFPS: z.ZodOptional<z.ZodBoolean>;
    disableActiveManager: z.ZodOptional<z.ZodBoolean>;
    hdrUrl: z.ZodOptional<z.ZodString>;
    autoTime: z.ZodOptional<z.ZodBoolean>;
    fixTime: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;

type InitOption = z.infer<typeof InitOptionSchema>;

declare class SceneManager {
    constructor(option?: InitOption);
    injectCycle(injectCycleMode: InjectCycleModeType, fn: () => void): void;
    dispose(): void;
}

declare class RenderContext {
    #private;
    static readonly CONTEXT_START: string;
    constructor(container: HTMLDivElement, option?: InitOption);
    setLoading(visible: boolean): void;
    getCanvas(): HTMLCanvasElement;
    setFPS(fps: number): void;
    dispose(): void;
}

declare class QueryManager {
    #private;
    ready: Promise<void>;
    constructor(worker: Worker);
    postMsg(buffer: ArrayBuffer): void;
    getEntityById(id: string): NullValue<BaseEntity>;
    getEntityByForeignKey(foreignKey: string): NullValue<BaseEntity>;
    getEntityByOtherKey(otherKey: string): NullValue<BaseEntity>;
    getParentByEntity(entity: BaseEntity): NullValue<BaseEntity>;
    getMainEntity(): MainEntity;
    getHits(): BaseEntity[];
    getWarnings(): BaseEntity[];
    dispose(): void;
}

declare const init: (container: HTMLDivElement, option: InitOption) => Promise<{
    queryManager: Partial<QueryManager>;
    renderContext: Partial<RenderContext>;
    sceneManager: Partial<SceneManager>;
    cameraManager: Partial<CameraManager>;
    modelManager: Partial<ModelManager>;
    eventManager: Partial<EventManager>;
    hitManager: Partial<HitManager>;
    windowManager: Partial<WindowManager>;
    animateManager: Partial<AnimateManager>;
    activeStateManager: Partial<ActiveStateManager> | null;
    sceneReady: Promise<void>;
}>;
declare const dispose: () => void;

export { dispose, init };
