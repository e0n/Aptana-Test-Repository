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

    it("should create a stage", function() {
        expect(new Kinetic.Stage({
            container: "container"
        }));
    });

    it("should be a test test", function() {
        expect(newNodeFactory.testJasminAdd(2,3)).toEqual(5);
    });
});