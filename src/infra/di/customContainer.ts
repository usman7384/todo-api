import 'reflect-metadata';
import { Container, interfaces } from 'inversify';
// import { initializeRepositories } from './repositoryBindings';
// import { initializeServices } from './serviceBindings';

interface ICustomContainer {
    getContainer(): Container;
    bind<T>(sericeIdentifier: interfaces.ServiceIdentifier<T>): interfaces.BindingToSyntax<T>;
}


class CustomContainer implements ICustomContainer {
    private container: Container;

    constructor() {
        this.container = new Container();
        // this.initializeContainer();
    }

    // private initializeContainer() {
    //     // initializeRepositories(this.container);
    //     // initializeServices(this.container);
    // }

    public getContainer(): Container {
        return this.container;
    }

    public bind<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): interfaces.BindingToSyntax<T> {
        return this.container.bind<T>(serviceIdentifier);
    }
}

export default CustomContainer;
