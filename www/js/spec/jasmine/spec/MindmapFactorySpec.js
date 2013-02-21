describe("Factory tests: ", function() {
    var baseNode;
    var rectNode;
    var layer;
    var stage;

    describe("creating test environment", function() {
        it("should create a stage", function() {
            expect(new Kinetic.Stage({
                container: "container",
                width: 0,
                height: 0
            })).toBeDefined();
        });

        it("should create a layer", function() {
            expect(new Kinetic.Layer({
                container: "container",
                width: 0,
                height: 0
            })).toBeDefined();
        });
    });




    describe("a base node", function() {

        beforeEach(function() {
            stage = new Kinetic.Stage({container: "container",width: 0, height:0});
            layer = new Kinetic.Layer();
            baseNode = newNodeFactory.CreateBaseNode(stage, layer);
        });

        afterEach(function() {
            baseNode.stage.clear();
            baseNode.stage.remove();
            delete baseNode;
        });

        it("should create a node", function() {
            expect(baseNode).toBeDefined();
        });
        it("should have a group-element", function() {
            expect(baseNode.group).toBeDefined();
        });
        it("should have a shape-element", function() {
            expect(baseNode.shape).toBeDefined();
        });
        it("should have a text-element", function() {
            expect(baseNode.text).toBeDefined();
        });
        it("should have a text-element with standard text 'RootNode'", function() {
            expect(baseNode.getText()).toBe('RootNode');
        });
        it("should be able to change text to 'testing root'", function() {
            baseNode.setText('testing root');
            expect(baseNode.getText()).toBe('testing root');
        });
        it("should have backgroundcolor '#F7F7F7'", function() {

            expect(baseNode.getBackground()).toBe('#F7F7F7');
        });
        it("should be able to change backgroundcolor to '#3D9DB3'", function() {
            baseNode.fillBackground('#3D9DB3');
            expect(baseNode.getBackground()).toBe('#3D9DB3');
        });
        it("should have his connection points at (0/0)", function() {
            expect(baseNode.xConnectPosition).toBe(0);
            expect(baseNode.yConnectPosition).toBe(0);
        });
        it("with widthshould now have his connection points at (3/3)", function() {
            baseNode = newNodeFactory.CreateBaseNode(
                new Kinetic.Stage({container: "container",width: 6, height:6}),
                new Kinetic.Layer());
            expect(baseNode.xConnectPosition).toBe(3);
            expect(baseNode.yConnectPosition).toBe(3);
        });
    });



    describe("a rect node", function() {
        beforeEach(function() {
            stage = new Kinetic.Stage({container: "container",width: 0, height:0});
            layer = new Kinetic.Layer();
            baseNode = newNodeFactory.CreateBaseNode(stage, layer);
            rectNode = newNodeFactory.NewRectNode(layer, baseNode);
        });

        afterEach(function() {
            baseNode.stage.clear();
            baseNode.stage.remove();
            delete baseNode;
            delete rectNode;
        });

        it("should create a rectangle node", function() {
            expect(rectNode);
        });
        it("should have a group-element", function() {
            expect(rectNode.group);
        });
        it("should have a text-element", function() {
            expect(rectNode.text);
        });
        it("should have a text-element with standard text 'New content'", function() {
            expect(rectNode.getText()).toBe('New content');
        });
        it("should be able to change text to 'testing text editing'", function() {
            rectNode.setText('testing text editing');
            expect(rectNode.getText()).toBe('testing text editing');
        });
        it("should have backgroundcolor '#F7F7F7'", function() {
            expect(rectNode.getBackground()).toBe('#F7F7F7');
        });
        it("should be able to change backgroundcolor to '#3D9DB3'", function() {
            rectNode.fillBackground('#3D9DB3');
            expect(rectNode.getBackground()).toBe('#3D9DB3');
        });
        it("should have his connection points at (100 + 100 / 19,6 + 100)   (width/2 + xPosiotion / height/2 + yPosiotion", function() {

            expect(rectNode.xConnectPosition).toBe(200);
            expect(rectNode.yConnectPosition).toBe(119.6);
        });
        it("shouldn't have the the same connectionpoint after resizing and moving the node", function() {
            rectNode.group.setX(20);
            rectNode.group.setY(20);
            rectNode.text.setWidth(20);
            rectNode.text.setHeight(20);
            rectNode.updateConnectionpoints();
            expect(rectNode.xConnectPosition == '200').toBeFalsy();
            expect(rectNode.yConnectPosition== '119.6').toBeFalsy();
        });
        it("should have the correct connectionpoint after resizing and moving the node", function() {
            rectNode.group.setX(20);
            rectNode.group.setY(20);
            rectNode.text.setWidth(20);
            rectNode.text.setHeight(20);
            rectNode.updateConnectionpoints();
            expect(rectNode.xConnectPosition == '30').toBeTruthy();
            expect(rectNode.yConnectPosition== '30').toBeTruthy();
        });
        it("should have a base parent node", function() {
            expect(rectNode.parentNode).toBeDefined();
        });
        it("should have no child-nodes after creating", function() {
            expect(rectNode.childElements.length).toBe(0);
        });
        it("should be able to have child-nodes (creating 2 nodes)", function() {
            newNodeFactory.NewRectNode(layer, rectNode);
            newNodeFactory.NewRectNode(layer, rectNode);
            expect(rectNode.childElements.length).toBe(2);
        });
    });

    it("should be a test test", function() {
        expect(newNodeFactory.testJasminAdd(2,3)).toEqual(5);
    });
});