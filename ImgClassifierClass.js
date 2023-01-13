import * as torch from "torch";
import * as torchvision from "torchvision";
import { optimize_for_mobile } from "torch/utils/mobile_optimizer";
var model, num_classes, optimized_model, scripted_model, transform;

class Plant_Disease_Model extends nn.Module {
    constructor() {
        var num_ftrs;
        super();
        this.network = models.resnet34({
            pretrained: true,
        });
        num_ftrs = this.network.fc.in_features;
        this.network.fc = new nn.Linear(num_ftrs, 38);
    }

    forward(xb) {
        var out;
        out = this.network(xb);
        return out;
    }
}

transform = new transforms.Compose([
    new transforms.Resize({
        size: 128,
    }),
    new transforms.ToTensor(),
]);
num_classes = [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew",
    "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy",
    "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot",
    "Peach___healthy",
    "Pepper,_bell___Bacterial_spot",
    "Pepper,_bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Raspberry___healthy",
    "Soybean___healthy",
    "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch",
    "Strawberry___healthy",
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy",
];
model = new Plant_Disease_Model();
model.load_state_dict(
    torch.load("/content/model.pth", {
        map_location: torch.device("cpu"),
    })
);
model.eval();
scripted_model = torch.jit.script(model);
optimized_model = optimize_for_mobile(scripted_model);

optimized_model._save_for_lite_interpreter("plant-disease.ptl");

console.log("model successfully exported");
