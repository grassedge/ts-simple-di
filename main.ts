interface A {
    methodA(): void;
}
interface B {
    methodB(): void;
}

interface Container {
    a: () => A;
    b: () => B;
}

// ---- Injectable components. ----

const componentA1 = ({ b }: { b: () => B }) => ({
    methodA(): void {
        console.log("here is methodA1");
        b().methodB();
    },
});

const componentA2 = ({ b }: { b: () => B }) => ({
    methodA(): void {
        console.log("here is methodA2");
        b().methodB();
    },
});

const componentB1 = ({ }) => ({
    methodB() {
        console.log("here is methodB1");
    },
});

const componentB2 = ({ }) => ({
    methodB() {
        console.log("here is methodB2");
    },
});

// ---- DI Container definitions. ----

function createContainer1() {
    const container = {
        a: () => componentA1(container), // injection
        b: () => componentB1(container), // injection
    };
    return container;
}

function createContainer2() {
    const container = {
        a: () => componentA1(container), // injection
        b: () => componentB2(container), // injection
    };
    return container;
}

function createContainer3() {
    const container = {
        a: () => componentA2(container), // injection
        b: () => componentB2(container), // injection
    };
    return container;
}

// ---- Test components and container ----

function main() {
    {
        const container = createContainer1();
        container.a().methodA();
        // here is methodA1
        // here is methodB1  <- componentB1 injected.
    }
    {
        const container = createContainer2();
        container.a().methodA();
        // here is methodA1
        // here is methodB2  <- componentB2 injected.
    }
    {
        const container = createContainer3();
        container.a().methodA();
        // here is methodA2
        // here is methodB2  <- componentB2 injected.
    }
}

main();
