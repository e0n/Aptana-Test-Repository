describe("Factory tests", function() {
    var baseNode;
    var rectNode;

    beforeEach(function() {
//        document.getElementById("container");
//        var stage = new Kinetic.Stage({
//            container: "container",
//            width: 578,
//            height: 200
//        });
//        var layer = new Kinetic.Layer();
//
//        baseNode = newNodeFactory.CreateBaseNode(stage, layer);
//        rectNode = newNodeFactory.NewRectNode(layer, baseNode);
    });
    describe("creating test environment", function() {
        it("should create a stage", function() {
            expect(new Kinetic.Stage({
                container: "container",
                width: 100,
                height: 100
            }));
        });

        it("should create a layer", function() {
            expect(new Kinetic.Layer({
                container: "container",
                width: 100,
                height: 100
            }));
        });
    });
    describe("a base node", function() {
//        var stage = new Kinetic.Stage({
//            container: "container"
//        });
//        var layer = new Kinetic.Layer();
        beforeEach(function() {
            baseNode = newNodeFactory.CreateBaseNode(
                new Kinetic.Stage({container: "container"}),
                new Kinetic.Layer());
        });

        it("should create a node", function() {
            expect(newNodeFactory.CreateBaseNode(
                new Kinetic.Stage({container: "container"}),
                new Kinetic.Layer()));
//            expect(baseNode.group);
//            expect(baseNode.shape);
        });
        it("should have a group", function() {
            expect(baseNode.group);
        });
        it("should have a shape", function() {
            expect(baseNode.shape);
        });
    });

    it("should be a test test", function() {
        expect(newNodeFactory.testJasminAdd(2,3)).toEqual(5);
    });
});