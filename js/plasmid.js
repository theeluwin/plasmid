// Generated by CoffeeScript 1.6.3
var Plasmid, Plasmid1D, Plasmid2D, PlasmidLL, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Plasmid = (function() {
  function Plasmid(canvas) {
    this.canvas = canvas;
    this.row = this.canvas.data("row");
    this.col = this.canvas.data("col");
    this.rule = this.canvas.data("rule");
    this.init = this.canvas.data("init");
    this.period = this.canvas.data("period");
    this.refresh();
  }

  Plasmid.prototype.clone = function(obj) {
    var key, newInstance;
    if ((obj == null) || typeof obj !== 'object') {
      return obj;
    }
    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }
    newInstance = new obj.constructor();
    for (key in obj) {
      newInstance[key] = this.clone(obj[key]);
    }
    return newInstance;
  };

  Plasmid.prototype.matrix = function(row, col) {
    var i, j, ret, temp, _i, _j;
    ret = [];
    for (i = _i = 0; _i < row; i = _i += 1) {
      temp = [];
      for (j = _j = 0; _j < col; j = _j += 1) {
        temp.push(0);
      }
      ret.push(temp);
    }
    return ret;
  };

  Plasmid.prototype.int = function(arg) {
    return parseInt(arg);
  };

  Plasmid.prototype.rand = function() {
    return Math.random();
  };

  Plasmid.prototype.print = function(arg) {
    return console.log(arg);
  };

  Plasmid.prototype.refresh = function() {
    var cellHeight, cellWidth, col, i, j, row, _i, _j, _ref, _ref1, _results;
    this.step = 0;
    this.cells = this.matrix(this.row + 2, this.col + 2);
    this.canvas.empty();
    cellWidth = 100 / this.col;
    cellHeight = 100 / this.row;
    _results = [];
    for (i = _i = 1, _ref = this.row; _i <= _ref; i = _i += 1) {
      row = $("<div style='height: " + cellHeight + "%'>");
      for (j = _j = 1, _ref1 = this.col; _j <= _ref1; j = _j += 1) {
        col = $("<div style='width: " + cellWidth + "%'>");
        row.append(col);
      }
      _results.push(this.canvas.append(row));
    }
    return _results;
  };

  Plasmid.prototype.propagate = function() {
    return this.step++;
  };

  Plasmid.prototype.render = function() {
    var cols, i, j, rows, _i, _ref, _results;
    rows = this.canvas.children();
    _results = [];
    for (i = _i = 1, _ref = rows.length; _i <= _ref; i = _i += 1) {
      cols = $(rows[i - 1]).children();
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (j = _j = 1, _ref1 = cols.length; _j <= _ref1; j = _j += 1) {
          _results1.push($(cols[j - 1]).attr("data-state", this.cells[i][j]));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  return Plasmid;

})();

Plasmid1D = (function(_super) {
  __extends(Plasmid1D, _super);

  function Plasmid1D(canvas) {
    var i, rule, _i;
    this.canvas = canvas;
    Plasmid1D.__super__.constructor.call(this, this.canvas);
    rule = [];
    for (i = _i = 0; _i < 8; i = _i += 1) {
      rule.push(this.rule % 2);
      this.rule = this.int(this.rule / 2);
    }
    this.rule = rule;
  }

  Plasmid1D.prototype.refresh = function() {
    var i, total, _i;
    Plasmid1D.__super__.refresh.call(this);
    if (this.init === "alone") {
      this.cells[1][this.int(this.col / 2) + 1] = 1;
    } else {
      total = this.int(this.col / 4);
      for (i = _i = 0; _i < total; i = _i += 1) {
        this.cells[1][this.int(this.rand() * this.col) + 1] = 1;
      }
    }
    return this.render();
  };

  Plasmid1D.prototype.propagate = function() {
    var i, left, mid, right, _i, _ref;
    Plasmid1D.__super__.propagate.call(this);
    if (this.period !== 0 && this.step % this.period === 0) {
      return this.refresh();
    }
    for (i = _i = 1, _ref = this.col; _i <= _ref; i = _i += 1) {
      left = this.cells[this.step][i - 1];
      mid = this.cells[this.step][i];
      right = this.cells[this.step][i + 1];
      this.cells[this.step + 1][i] = this.rule[left * 4 + mid * 2 + right];
    }
    return this.render();
  };

  return Plasmid1D;

})(Plasmid);

Plasmid2D = (function(_super) {
  __extends(Plasmid2D, _super);

  function Plasmid2D() {
    _ref = Plasmid2D.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Plasmid2D.prototype.refresh = function() {
    var col, i, row, total, _i;
    Plasmid2D.__super__.refresh.call(this);
    if (this.init === "alone") {
      this.cells[this.int(this.row / 2) + 1][this.int(this.col / 2) + 1] = 1;
    } else {
      total = this.int(this.row * this.col / 4);
      for (i = _i = 0; _i < total; i = _i += 1) {
        row = this.int(this.rand() * this.row) + 1;
        col = this.int(this.rand() * this.col) + 1;
        this.cells[row][col] = 1;
      }
    }
    return this.render();
  };

  Plasmid2D.prototype.propagate = function() {
    Plasmid2D.__super__.propagate.call(this);
    if (this.period !== 0 && this.step % this.period === 0) {
      return this.refresh();
    }
  };

  return Plasmid2D;

})(Plasmid);

PlasmidLL = (function(_super) {
  __extends(PlasmidLL, _super);

  function PlasmidLL(canvas) {
    var birth, i, rule, survive, _i, _j, _k, _l, _len, _len1;
    this.canvas = canvas;
    PlasmidLL.__super__.constructor.call(this, this.canvas);
    rule = {
      survive: [],
      birth: []
    };
    this.rule = this.rule.split("/");
    survive = this.rule[0];
    for (i = _i = 0; _i <= 8; i = ++_i) {
      rule.survive.push(0);
    }
    for (_j = 0, _len = survive.length; _j < _len; _j++) {
      i = survive[_j];
      rule.survive[this.int(i)] = 1;
    }
    birth = this.rule[1];
    for (i = _k = 0; _k <= 8; i = ++_k) {
      rule.birth.push(0);
    }
    for (_l = 0, _len1 = birth.length; _l < _len1; _l++) {
      i = birth[_l];
      rule.birth[this.int(i)] = 1;
    }
    this.rule = rule;
  }

  PlasmidLL.prototype.refresh = function() {
    var col, i, row, total, _i;
    PlasmidLL.__super__.refresh.call(this);
    if (this.init === "alone") {
      this.cells[this.int(this.row / 2) + 1][this.int(this.col / 2) + 1] = 1;
    } else if (this.init === "pentadecathlon") {
      this.cells[7][14] = 1;
      this.cells[7][19] = 1;
      this.cells[8][12] = 1;
      this.cells[8][13] = 1;
      this.cells[8][15] = 1;
      this.cells[8][16] = 1;
      this.cells[8][17] = 1;
      this.cells[8][18] = 1;
      this.cells[8][20] = 1;
      this.cells[8][21] = 1;
      this.cells[9][14] = 1;
      this.cells[9][19] = 1;
    } else if (this.init === "glider") {
      this.cells[2][3] = 1;
      this.cells[3][4] = 1;
      this.cells[4][2] = 1;
      this.cells[4][3] = 1;
      this.cells[4][4] = 1;
    } else {
      total = this.int(this.row * this.col / 4);
      for (i = _i = 0; _i < total; i = _i += 1) {
        row = this.int(this.rand() * this.row) + 1;
        col = this.int(this.rand() * this.col) + 1;
        this.cells[row][col] = 1;
      }
    }
    return this.render();
  };

  PlasmidLL.prototype.propagate = function() {
    var cells, i, j, sum, _i, _j, _ref1, _ref2;
    PlasmidLL.__super__.propagate.call(this);
    if (this.period !== 0 && this.step % this.period === 0) {
      return this.refresh();
    }
    cells = this.clone(this.cells);
    for (i = _i = 1, _ref1 = this.row; _i <= _ref1; i = _i += 1) {
      for (j = _j = 1, _ref2 = this.col; _j <= _ref2; j = _j += 1) {
        sum = 0;
        sum += this.cells[i - 1][j - 1] + this.cells[i - 1][j] + this.cells[i - 1][j + 1];
        sum += this.cells[i][j - 1] + this.cells[i][j + 1];
        sum += this.cells[i + 1][j - 1] + this.cells[i + 1][j] + this.cells[i + 1][j + 1];
        if (!this.cells[i][j] && this.rule.birth[sum]) {
          cells[i][j] = 1;
        }
        if (this.cells[i][j] && !this.rule.survive[sum]) {
          cells[i][j] = 0;
        }
      }
    }
    this.cells = this.clone(cells);
    return this.render();
  };

  return PlasmidLL;

})(Plasmid);

$(document).ready(function() {
  _ca = [];
  return $("div[data-ca]").each(function() {
    var ca, canvas, type;
    canvas = $(this);
    type = canvas.data("ca");
    if (type === "1d") {
      ca = new Plasmid1D(canvas);
    } else if (type === "2d") {
      ca = new Plasmid2D(canvas);
    } else {
      ca = new PlasmidLL(canvas);
    }
    return _ca.push(ca);
  });
});
