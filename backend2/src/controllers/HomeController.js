import Confeitaria from '../models/Confeitaria';

class HomeController {
  async index(req, res) {
    res.json({
      tudoCerto: true,
    });
  }
}

export default new HomeController();
