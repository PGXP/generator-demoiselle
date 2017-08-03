package <%= package.lower %>.<%= project.lower %>.entity;

import <%= package.lower %>.<%= project.lower %>.constants.Perfil;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import java.util.UUID;
import javax.persistence.Basic;
import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import static javax.persistence.DiscriminatorType.STRING;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import static javax.persistence.InheritanceType.JOINED;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Email;
import pgxp.app.constants.Perfil;
import pgxp.app.entity.Escola;
import pgxp.app.entity.Estadocivil;

@Entity
@Table(uniqueConstraints = {
    @UniqueConstraint(columnNames = {"email"})})
@Inheritance(strategy = JOINED)
@DiscriminatorColumn(name = "perfil", discriminatorType = STRING)
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Usuario.findAll", query = "SELECT u FROM Usuario u")
    , @NamedQuery(name = "Usuario.findByPerfil", query = "SELECT u FROM Usuario u WHERE u.perfil = :perfil")
    , @NamedQuery(name = "Usuario.findByCpf", query = "SELECT u FROM Usuario u WHERE u.cpf = :cpf")
    , @NamedQuery(name = "Usuario.findByIdentidade", query = "SELECT u FROM Usuario u WHERE u.identidade = :identidade")
    , @NamedQuery(name = "Usuario.findByEmail", query = "SELECT u FROM Usuario u WHERE u.email = :email")
    , @NamedQuery(name = "Usuario.findByFullname", query = "SELECT u FROM Usuario u WHERE u.fullname = :fullname")
    , @NamedQuery(name = "Usuario.findBySexo", query = "SELECT u FROM Usuario u WHERE u.sexo = :sexo")
    , @NamedQuery(name = "Usuario.findByNiver", query = "SELECT u FROM Usuario u WHERE u.niver = :niver")
    , @NamedQuery(name = "Usuario.findByNotifica", query = "SELECT u FROM Usuario u WHERE u.notifica = :notifica")
    , @NamedQuery(name = "Usuario.findByAtivo", query = "SELECT u FROM Usuario u WHERE u.ativo = :ativo")
    , @NamedQuery(name = "Usuario.findBySenha", query = "SELECT u FROM Usuario u WHERE u.senha = :senha")})
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Enumerated(value = EnumType.STRING)
    private Perfil perfil;

    @Id
    @Type(type = "pg-uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @GeneratedValue(generator = "uuid")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "escola_id", nullable = false)
    private Escola escola;

    @ManyToOne
    @JoinColumn(name = "estadocivil_id")
    private Estadocivil estadocivil;

    // @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message="E-mail inválido")//if the field contains email address consider using this annotation to enforce field validation
    @Size(max = 128)
    @Column(length = 128)
    private String email;

    @Size(max = 16)
    @Column(length = 16)
    private String cpf;
    @Size(max = 32)
    @Column(length = 32)
    private String identidade;

    @Size(max = 128)
    @Column(length = 128)
    private String fullname;
    @Size(max = 1)
    @Column(length = 1)
    private String sexo;
    @Temporal(TemporalType.DATE)
    private Date niver;
    private Boolean notifica;
    private Boolean ativo;
    @Size(max = 128)
    @Column(length = 128)
    private String senha;

    public Usuario() {
    }

    public Usuario(UUID id) {
        this.id = id;
    }

    public Perfil getPerfil() {
        return perfil;
    }

    public void setPerfil(Perfil perfil) {
        this.perfil = perfil;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Escola getEscola() {
        return escola;
    }

    public void setEscola(Escola escola) {
        this.escola = escola;
    }

    public Estadocivil getEstadocivil() {
        return estadocivil;
    }

    public void setEstadocivil(Estadocivil estadocivil) {
        this.estadocivil = estadocivil;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getIdentidade() {
        return identidade;
    }

    public void setIdentidade(String identidade) {
        this.identidade = identidade;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public Date getNiver() {
        return niver;
    }

    public void setNiver(Date niver) {
        this.niver = niver;
    }

    public Boolean getNotifica() {
        return notifica;
    }

    public void setNotifica(Boolean notifica) {
        this.notifica = notifica;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

}