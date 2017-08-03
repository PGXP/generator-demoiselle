package <%= package.lower %>.<%= project.lower %>.envers;

import java.util.Date;
import java.util.logging.Logger;
import static java.util.logging.Logger.getLogger;
import static javax.enterprise.inject.spi.CDI.current;
import javax.transaction.Transactional;
import org.demoiselle.jee.core.api.security.DemoiselleUser;
import org.demoiselle.jee.core.api.security.SecurityContext;
import org.hibernate.envers.RevisionListener;

/**
 *
 * @author 70744416353
 */
public class AuditRevisionListener implements RevisionListener {

    private static final Logger LOG = getLogger(AuditRevisionListener.class.getName());

    /**
     *
     * @param o
     */
    @Override
    @Transactional
    public void newRevision(Object o) {
        SecurityContext securityContext = current().select(SecurityContext.class).get();
        AuditRevEntity auditRevEntity = (AuditRevEntity) o;
        DemoiselleUser usuario = securityContext.getUser();
        if (usuario != null) {
            auditRevEntity.setUsername(usuario.getName());
            auditRevEntity.setWhere(usuario.getParams("IP"));
            auditRevEntity.setFingerprint(usuario.getParams("Fingerprint"));
            auditRevEntity.setPerfil(usuario.getRoles().get(0));
            auditRevEntity.setFullName(usuario.getIdentity());
            auditRevEntity.setDataCriacao(new Date());
        }
    }

}
